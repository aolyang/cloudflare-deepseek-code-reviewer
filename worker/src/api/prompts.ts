import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { z } from "zod"

import { promptOverLimit } from "../utils/prompt"
import { PromptSchema, ResponsePromptsSchema } from "./prompts.schema"

const prompts = new Hono<{ Bindings: CloudflareEnv }>()

prompts.get("/",
    describeRoute({
        description: "Get all prompts",
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: ResponsePromptsSchema
                    }
                }
            }
        }
    }),
    async (c) => {
        const value = await c.env.prompts.list()
        const prompts = await Promise.all(value.keys.map(async (item) => {
            const prompt = await c.env.prompts.get(item.name)
            return prompt && JSON.parse(prompt)
        })).then((prompts) => prompts.filter(Boolean))
        return c.json({ prompts })
    }
)

prompts.put("/",
    describeRoute({
        description: "import prompts json"
    }),
    async (c) => {
        const body = await c.req.text()
        const parse = z.array(PromptSchema).safeParse(JSON.parse(body))
        const failed: string[] = []

        if (!parse.success) return c.json({ message: "JSON parse failed" })

        for (const prompt of parse.data) {
            const { str, oversize } = promptOverLimit(prompt)
            if (oversize) {
                failed.push(prompt.name)
            } else {
                await c.env.prompts.put(prompt.name, str)
            }
        }

        return c.json({
            message: failed.length
                ? `${failed.join(",")} are parse failed`
                : "parse data success"
        })
    }
)
export default prompts

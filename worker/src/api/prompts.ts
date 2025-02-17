import { Hono } from "hono"
import { describeRoute } from "hono-openapi"

import { ResponsePromptsSchema } from "./prompts.schema"

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

export default prompts

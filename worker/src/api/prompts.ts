import type { Prompt} from "./prompts.schema"

import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver } from "hono-openapi/zod"

import { ResponsePromptsSchema } from "./prompts.schema"
import { PromptSchema } from "./prompts.schema"
import { promptOverLimit } from "../utils/common"

const prompts = new Hono<{ Bindings: CloudflareEnv }>()

const KVValueLimit = 25 * 1024 * 1024 // MB

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

prompts.get("/:key",
    describeRoute({
        description: "Get prompt by key",
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: resolver(PromptSchema)
                    }
                }
            }
        }
    }),
    async (c) => {
        const key = c.req.param("key")
        const prompt = await c.env.prompts.get(key)

        if (!prompt) return c.json({ error: "Prompt not found" }, 404)
        return c.json({ prompt: JSON.parse(prompt) })
    }
)

prompts.put("/:key",
    describeRoute({
        description: "create a new prompt",
        requestBody: {
            content: {
                "application/json": {
                    schema: resolver(PromptSchema)
                }
            }
        },
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: resolver(PromptSchema)
                    }
                }
            }
        }
    }),
    zValidator("json", PromptSchema),
    async (c) => {
        const key = c.req.param("key")
        const prompt = await c.req.json()
        const promptStr = JSON.stringify(prompt)

        if (new TextEncoder().encode(promptStr).length > KVValueLimit) {
            return c.json({ error: "Prompt size exceeds 25MB limit" }, 400)
        }
        await c.env.prompts.put(key, JSON.stringify(prompt))
        return c.json({ prompt })
    }
)

prompts.post("/:key",
    describeRoute({
        description: "Update prompt",
        requestBody: {
            content: {
                "application/json": {
                    schema: resolver(PromptSchema.partial())
                }
            }
        },
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: resolver(PromptSchema)
                    }
                }
            }
        }
    }),
    zValidator("json", PromptSchema.partial()),
    async (c) => {
        const key = c.req.param("key")

        const _prompt = await c.env.prompts.get(key)
        if (!_prompt) return c.json({ error: `Prompt [${key}] not found` }, 404)

        const prompt = await c.req.json() as Partial<Prompt>
        const newPrompt = { ...JSON.parse(_prompt), ...prompt }
        const promptStr = JSON.stringify(newPrompt)

        if (new TextEncoder().encode(promptStr).length > KVValueLimit) {
            return c.json({ error: "Prompt size exceeds 25MB limit" }, 400)
        }

        if (newPrompt.name !== key) c.env.prompts.delete(key)

        await c.env.prompts.put(newPrompt.name, promptStr)
        return c.json({ success: true, key, prompt: newPrompt })
    }
)

prompts.delete("/:key",
    describeRoute({
        description: "Delete a prompt by key"
    }),
    async (c) => {
        const key = c.req.param("key")
        await c.env.prompts.delete(key)
        return c.json({ success: true })
    }
)

prompts.put("/",
    describeRoute({
        description: "Upload a JSON file containing an array of Prompt objects",
        requestBody: {
            content: {
                "application/json": {
                    schema: resolver(z.array(PromptSchema))
                }
            }
        }
    }),
    async (c) => {
        const promptsArray = await c.req.json()
        const parsedPrompts = z.array(PromptSchema).safeParse(promptsArray)

        if (!parsedPrompts.success) {
            return c.json({ error: "Invalid JSON file" }, 400)
        }
        const failed: string[] = []
        for (const prompt of parsedPrompts.data) {
            const { str, oversize } = promptOverLimit(prompt)
            if (oversize) {
                failed.push(prompt.name)
                continue
            }
            await c.env.prompts.put(prompt.name, promptStr)
        }
        
        return c.json({ success: true, message: failed.join(",") + " are failed" })
    }
)

export default prompts

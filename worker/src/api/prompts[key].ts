import type { Prompt} from "./prompts.schema"

import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver } from "hono-openapi/zod"

import { promptOverLimit } from "../utils/prompt"
import { PromptSchema } from "./prompts.schema"

const prompts$key = new Hono<{ Bindings: CloudflareEnv }>()

const route = "/" as "/:key"

prompts$key.get(route,
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

prompts$key.put(route,
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

        const { oversize } = promptOverLimit(prompt)
        if (oversize) return c.json({ error: "Prompt size exceeds 25MB limit" }, 400)

        await c.env.prompts.put(key, JSON.stringify(prompt))
        return c.json({ prompt })
    }
)

prompts$key.post(route,
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
        const { str, oversize } = promptOverLimit(newPrompt)

        if (oversize) return c.json({ error: "Prompt size exceeds 25MB limit" }, 400)

        if (newPrompt.name !== key) await c.env.prompts.delete(key)

        await c.env.prompts.put(newPrompt.name, str)
        return c.json({ success: true, key, prompt: newPrompt })
    }
)

prompts$key.delete(route,
    describeRoute({
        description: "Delete a prompt by key"
    }),
    async (c) => {
        const key = c.req.param("key")
        await c.env.prompts.delete(key)
        return c.json({ success: true })
    }
)

export default prompts$key

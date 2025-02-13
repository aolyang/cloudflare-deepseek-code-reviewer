import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { promptSchema } from "./prompts.schema"
import { v4 as uuidv4 } from 'uuid'
import { describeRoute } from "hono-openapi"
import { resolver } from "hono-openapi/zod"

const prompts = new Hono<{ Bindings: CloudflareEnv }>()

prompts.get("/api/prompts/:key",
  describeRoute({
    description: "Get a prompt by key",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(promptSchema)
          }
        }
      }
    }
  }),
  async (c) => {
    const key = c.req.param("key")
    const prompt = await c.env.prompts.get(key)
    if (!prompt) {
      return c.json({ error: "Prompt not found" }, 404)
    }
    return c.json(JSON.parse(prompt))
  }
)

prompts.put("/api/prompts/:key",
  describeRoute({
    description: "Update a prompt by key",
    requestBody: {
      content: {
        "application/json": {
          schema: resolver(promptSchema)
        }
      }
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(promptSchema)
          }
        }
      }
    }
  }),
  zValidator("json", promptSchema),
  async (c) => {
    const key = c.req.param("key")
    const prompt = await c.req.json()
    const promptSize = new TextEncoder().encode(JSON.stringify(prompt)).length
    if (promptSize > 25 * 1024 * 1024) {
      return c.json({ error: "Prompt size exceeds 25MB limit" }, 400)
    }
    await c.env.prompts.put(key, JSON.stringify(prompt))
    return c.json(prompt)
  }
)

prompts.post("/api/prompts",
  describeRoute({
    description: "Create a new prompt",
    requestBody: {
      content: {
        "application/json": {
          schema: resolver(promptSchema)
        }
      }
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(promptSchema)
          }
        }
      }
    }
  }),
  zValidator("json", promptSchema),
  async (c) => {
    const key = uuidv4()
    const prompt = await c.req.json()
    const promptSize = new TextEncoder().encode(JSON.stringify(prompt)).length
    if (promptSize > 25 * 1024 * 1024) {
      return c.json({ error: "Prompt size exceeds 25MB limit" }, 400)
    }
    await c.env.prompts.put(key, JSON.stringify(prompt))
    return c.json({ success: true, key, prompt })
  }
)

prompts.delete("/api/prompts/:key",
  describeRoute({
    description: "Delete a prompt by key",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(promptSchema)
          }
        }
      }
    }
  }),
  async (c) => {
    const key = c.req.param("key")
    await c.env.prompts.delete(key)
    return c.json({ success: true })
  }
)

export default prompts

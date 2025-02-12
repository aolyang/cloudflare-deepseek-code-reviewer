import "zod-openapi/extend"

import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { validator } from "hono-openapi/zod"

import { cloudflare } from "../utils/cloudflare"
import { querySchema } from "./models.schema"

const models = new Hono<{ Bindings: CloudflareEnv }>()

models.get("/",
    describeRoute({
        description: "List cloudflare available models"
    }),
    validator("query", querySchema),
    async c => {
        const response = await cloudflare(c).ai.models.list({ account_id: c.env.ACCOUNT_ID })
        return c.json({ models: response.result })
    }
)

export default models

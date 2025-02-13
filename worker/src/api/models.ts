import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { validator } from "hono-openapi/zod"

import { cloudflare } from "../utils/cloudflare"
import { ModelQuerySchema, ModelsQuerySchema } from "./models.schema"

const models = new Hono<{ Bindings: CloudflareEnv }>()

models.get("/schema",
    describeRoute({
        description: "Get cloudflare model schema by name[Not ready]"
    }),
    validator("query", ModelQuerySchema),
    async (c) => {
        const { model } = ModelQuerySchema.parse(c.req.query())
        const response = await cloudflare(c).ai.models.schema.get({ model, account_id: c.env.ACCOUNT_ID }) as object
        return c.json(response)
    }
)

models.get("/",
    describeRoute({
        description: "List cloudflare available models"
    }),
    validator("query", ModelsQuerySchema),
    async (c) => {
        const query = ModelsQuerySchema.parse(c.req.query())

        const response = await cloudflare(c).ai.models.list({ ...query, account_id: c.env.ACCOUNT_ID })
        const { result, result_info } = response

        return c.json({ ...result_info, models: result })
    }
)

export default models

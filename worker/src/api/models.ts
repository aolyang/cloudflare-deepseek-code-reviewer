import { Hono } from "hono"

import { cloudflare } from "../utils/cloudflare"

const models = new Hono<{ Bindings: CloudflareEnv }>()

models.get("/", async c => {
    const response = await cloudflare(c).ai.models.list({ account_id: c.env.ACCOUNT_ID })
    return c.json({ models: response.result })
})

export default models

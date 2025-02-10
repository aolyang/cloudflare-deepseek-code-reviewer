import { Hono } from "hono"

const models = new Hono<{ Bindings: CloudflareEnv }>()

models.get(c => {
    return c.text("123")
})

export default models

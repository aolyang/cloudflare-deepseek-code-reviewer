import { Hono } from "hono"

const page = new Hono<{ Bindings: CloudflareEnv }>()

page.get("/", c => {
    return c.text("Hello, World!")
})

export default page

import { Hono } from "hono"
import { githubApp } from "../utils/github"

const github = new Hono<{ Bindings: CloudflareEnv }>()

github.post("/webhook", async (c) => {
    const body = await c.req.json()
    const signature = c.req.header("x-hub-signature-256")

    if (!signature) {
        return c.json({ error: "Signature missing" }, 400)
    }

    const app = githubApp(c)

    try {
        await app.webhooks.verify(body, signature)
    } catch (error) {
        return c.json({ error: "Invalid signature" }, 400)
    }

    if (body.action === "opened" && body.issue) {
        return c.json({ message: "Welcome! Issue created." })
    }

    return c.json({ message: "Event not handled" })
})

export default github

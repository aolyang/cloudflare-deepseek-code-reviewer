import { Hono } from "hono"

import { githubApp } from "../utils/github"
import { GitHubWebHook } from "./webhook-handlers"

const github = new Hono<{ Bindings: CloudflareEnv }>()

github.post("/webhook", async (c) => {
    const app = githubApp(c)

    const signature = c.req.header("x-hub-signature-256")

    if (!signature) return c.json({ error: "Signature missing" }, 400)

    try {
        await app.webhooks.verify(await c.req.text(), signature)
    } catch (error) {
        return c.json({ error: "Invalid signature" }, 400)
    }

    const payload = await c.req.json()

    if (GitHubWebHook.isIssueCommentCreated(payload)) await GitHubWebHook.issueCommentCreatedHandler(c, app, payload)

    if (payload.action === "opened" && payload.issue) {
        return c.json({ message: "Welcome! Issue created." })
    }
    return c.json({ message: "Event not handled" })
})

export default github

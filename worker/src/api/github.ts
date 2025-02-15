import { Hono } from "hono"

import { githubApp } from "../utils/github"

const github = new Hono<{ Bindings: CloudflareEnv }>()

let app: ReturnType<typeof githubApp>

github.post("/webhook", async (c) => {
    if (!app) app = githubApp(c)

    const signature = c.req.header("x-hub-signature-256")

    if (!signature) return c.json({ error: "Signature missing" }, 400)

    try {
        await app.webhooks.verify(await c.req.text(), signature)
    } catch (error) {
        return c.json({ error: "Invalid signature" }, 400)
    }

    const body = await c.req.json()
    console.log("body", body)
    if (body.action === "opened" && body.issue) {
        return c.json({ message: "Welcome! Issue created." })
    }

    app.webhooks.on("issues.opened", async ({ octokit, payload }) => {
        console.log("issues.opened", payload)
        await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
            {
                owner: payload.repository.owner.login,
                repo: payload.repository.name,
                issue_number: payload.issue.number,
                body: "Hello there from [octokit](https://github.com/octokit/app.js/)"
            }
        )
    })
    app.webhooks.on("commit_comment.created", async ({ octokit, payload }) => {
        console.log("Commit comment created", payload)
    })
    return c.json({ message: "Event not handled" })
})

export default github

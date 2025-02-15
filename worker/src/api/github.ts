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
    console.log("body action", body.action)

    if (body.action === "issue_comment.created") {
        const { octokit, payload } = await app.webhooks.receive({
            id: c.req.header("x-github-delivery")!,
            name: "issue_comment",
            payload: body
        })
        console.log("issue_comment.created", payload)
        await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
            {
                owner: payload.repository.owner.login,
                repo: payload.repository.name,
                issue_number: payload.issue.number,
                body: "hello"
            }
        )
    }

    if (body.action === "opened" && body.issue) {
        return c.json({ message: "Welcome! Issue created." })
    }
    return c.json({ message: "Event not handled" })
})

export default github

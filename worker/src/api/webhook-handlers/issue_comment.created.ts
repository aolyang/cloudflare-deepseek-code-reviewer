import type { EmitterWebhookEvent } from "@octokit/webhooks"
import type { Context } from "hono"
import type { GitHubApp } from "../../utils/github"

// https://docs.github.com/en/webhooks/webhook-events-and-payloads#create

export type PayloadIssueCommentCreated = EmitterWebhookEvent<"issue_comment.created">["payload"]

export const isIssueCommentCreated = (
    payload: { action: string; issue?: object; comment?: object }
): payload is PayloadIssueCommentCreated => {
    return (
        payload.action === "created" &&
        !!payload.issue &&

        typeof payload.issue === "object" &&
        "number" in payload.issue &&
        "html_url" in payload.issue &&

        !!payload.comment &&
        typeof payload.comment === "object" &&
        "body" in payload.comment &&
        "user" in payload.comment &&

        !!payload.comment.user &&
        typeof payload.comment.user === "object" &&
        "login" in payload.comment?.user
    )
}

export const issueCommentCreatedHandler = async (
    ctx: Context<{ Bindings: CloudflareEnv }>,
    app: GitHubApp,
    payload: PayloadIssueCommentCreated
) => {
    const commentBody = payload.comment.body.trim()

    const installationId = payload.installation?.id
    if (!installationId) return ctx.json({ message: "installation not found" })

    if (commentBody.startsWith("/")) {
        const command = commentBody.slice(1).split(" ")[0]
        const commandExists = await ctx.env.prompts.get(command)

        const octokit = await app.getInstallationOctokit(installationId)

        let message
        if (commandExists) {
            message = `hello, ${command} command found`
        } else {
            message = `hello, ${command} command not support yet`
        }
        await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
            owner: payload.repository.owner.login,
            repo: payload.repository.name,
            issue_number: payload.issue.number,
            body: message
        })
    }

    return ctx.json({ message: "received" })
}

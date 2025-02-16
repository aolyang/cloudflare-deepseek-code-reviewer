import type { EmitterWebhookEvent} from "@octokit/webhooks"
import type { GitHubApp } from "../../utils/github"
import type { Context } from "hono"

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

        !! payload.comment.user &&
        typeof payload.comment.user === "object" &&
        "login" in payload.comment?.user
    )
}

export const issueCommentCreatedHandler = async (ctx: Context<{ Bindings: CloudflareEnv }>, app: GitHubApp, payload: PayloadIssueCommentCreated) => {
    console.log("payload", payload)

    const commentBody = payload.comment.body.trim()

    if (commentBody.startsWith("/")) {
        const command = commentBody.slice(1).split(" ")[0]

        const commandExists = await ctx.env.prompts.get(command)

        if (commandExists) {
            await app.octokit.issues.createComment({
                owner: payload.repository.owner.login,
                repo: payload.repository.name,
                issue_number: payload.issue.number,
                body: `hello match the command ${command}`
            })
        } else {
            await app.octokit.issues.createComment({
                owner: payload.repository.owner.login,
                repo: payload.repository.name,
                issue_number: payload.issue.number,
                body: `hello, ${command} command not supported yet`
            })
        }
    }
}

import type { EmitterWebhookEvent} from "@octokit/webhooks"
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

        !! payload.comment.user &&
        typeof payload.comment.user === "object" &&
        "login" in payload.comment?.user
    )
}

export const issueCommentCreatedHandler = async (app: GitHubApp, payload: PayloadIssueCommentCreated) => {
    console.log("payload", payload)
}

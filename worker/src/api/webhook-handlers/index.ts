import * as ModuleIssueCommentCreated from "./issue_comment.created"

export namespace GitHubWebHook {
    export type PayloadIssueCommentCreated = ModuleIssueCommentCreated.PayloadIssueCommentCreated

    export const isIssueCommentCreated = ModuleIssueCommentCreated.isIssueCommentCreated

    export const issueCommentCreatedHandler = ModuleIssueCommentCreated.issueCommentCreatedHandler
}

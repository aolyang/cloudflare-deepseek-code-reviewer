import type { EmitterWebhookEvent } from "@octokit/webhooks"
import type { Context } from "hono"
import type { GitHubApp } from "../../utils/github"
import type { Prompt } from "../prompts.schema"

import { jp } from "../../utils/common"
import { InternalPrompts } from "../../utils/prompt"
import collectGithubPullRequestPatch from "./handleArgumentIncludePatch"

// https://docs.github.com/en/webhooks/webhook-events-and-payloads#create

export type PayloadIssueCommentCreated = EmitterWebhookEvent<"issue_comment.created">["payload"]

// TODO check the action type more confidently
// I am not sure, this is Gemini suggestion, I have not found the best practice for this yet
// I think this is fine for now, I will update this later
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

// TODO fix this type
type NotVerifiedAIResponse = {
    response: string
    usage: { // not sure
        prompt_token: number
        completion_token: number
        total_tokens: number
    }
}

export const issueCommentCreatedHandler = async (
    ctx: Context<{ Bindings: CloudflareEnv }>,
    app: GitHubApp,
    payload: PayloadIssueCommentCreated
) => {
    const commentLines = payload.comment.body.trim().split("\n")
    const lastLine = commentLines.pop()
    if (!lastLine || !lastLine.startsWith("/")) return ctx.json({ message: "no command found" })

    const installationId = payload.installation?.id
    if (!installationId) return ctx.json({ message: "installation not found" })

    const [command, ...args] = lastLine.slice(1).split(" ")
    const prompt = jp<Prompt>(await ctx.env.prompts.get(command) || "")

    const octokit = await app.getInstallationOctokit(installationId)

    let message = ""
    if (!prompt) {
        message = `hello, ${command} command not support yet`
    } else {
        const messages = prompt.messages.concat(InternalPrompts)

        if (commentLines.length) messages.push({ role: "user", content: commentLines.join("\n") })

        if (args.includes("--include-patch")) {
            const patch = await collectGithubPullRequestPatch(octokit, payload as any)
            messages.push({
                role: "user",
                content: `pull request patch: ${patch}`
            })
        }
        console.log("messages", prompt)
        try {
            const output = await ctx.env.AI.run(prompt.model as "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", {
                messages,
                stream: false
            }) as NotVerifiedAIResponse

            message += output.response
            message += "\nToken usage:"
            message += `\n-Prompt: ${output.usage.prompt_token}`
            message += `\n-Completion: ${output.usage.completion_token}`
            message += `\n-Total: ${output.usage.total_tokens}`
        } catch (e) {
            console.log("AI error", e)
        }
    }

    try {
        await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
            owner: payload.repository.owner.login,
            repo: payload.repository.name,
            issue_number: payload.issue.number,
            body: message
        })
    } catch (error) {
        console.log("github request error", error)
    }

    return ctx.json({ message: "received" })
}

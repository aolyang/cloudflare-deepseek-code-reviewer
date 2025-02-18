import type { Prompt } from "./prompts.schema"
import type { NotVerifiedAIResponse } from "./webhook-handlers/issue_comment.created"

export const prepareCommandPrompts = async (
    ctx: Context<{ Bindings: CloudflareEnv }>,
    command: string,
    commentLines: string[],
    prompt: Prompt
): Promise<string> => {
    const messages = [...prompt.messages]

    if (commentLines.length) messages.push({ role: "user", content: commentLines.join("\n")})

    const output = await ctx.env.AI.run(prompt.model as "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", {
        messages,
        stream: false
    }) as NotVerifiedAIResponse

    let message = output.response
    message += "\nToken usage:"
    message += `\n-Prompt: ${output.usage.prompt_token}`
    message += `\n-Completion: ${output.usage.completion_token}`
    message += `\n-Total: ${output.usage.total_tokens}`

    return message
}

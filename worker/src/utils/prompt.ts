import type { Prompt } from "../api/prompts.schema"

const KVValueLimit = 25 * 1024 * 1024 // MB

export const InternalPrompts: Prompt["messages"] = [
    {
        role: "system",
        content: "response should always short and clear, no more than 500 tokens"
    }
]

export const promptOverLimit = (prompt: Prompt) => {
    const str = JSON.stringify(prompt)
    return {
        str,
        oversize: new TextEncoder().encode(str).length > KVValueLimit
    }
}

"use server"
import { commonHeaders } from "@/src/utils/api"
import type { Prompt } from "@/src/utils/prompts"

export const getPrompts = async () => {
    return fetch(`${process.env.API_URL}/api/prompts`, {
        headers: commonHeaders
    }).then(res => res.json())
}

export const createPrompt = async (prompt: Prompt) => {
    return fetch(`${process.env.API_URL}/api/prompts/${prompt.name}`, {
        method: "PUT",
        headers: commonHeaders,
        body: JSON.stringify(prompt)
    }).then(res => res.json())
}

export const updatePrompt = async (prompt: Partial<Prompt>) => {
    return fetch(`${process.env.API_URL}/api/prompts/${prompt.name}`, {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify(prompt)
    }).then(res => res.json())
}

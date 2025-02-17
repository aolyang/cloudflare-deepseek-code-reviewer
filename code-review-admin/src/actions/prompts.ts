"use server"
import type { Prompt } from "@/src/utils/api"
import { commonHeaders } from "@/src/utils/api"

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

export const updatePrompt = async (key: string, prompt: Partial<Prompt>) => {
    return fetch(`${process.env.API_URL}/api/prompts/${key}`, {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify(prompt)
    }).then(res => res.json())
}

export const deletePrompt = async (promptName: string) => {
    return fetch(`${process.env.API_URL}/api/prompts/${promptName}`, {
        method: "DELETE",
        headers: commonHeaders
    }).then(res => res.json())
}

export const importPrompts = async (prompts: Prompt[]) => {
    return fetch(`${process.env.API_URL}/api/prompts`, {
        method: "PUT",
        headers: commonHeaders,
        body: JSON.stringify(prompts)
    }).then(res => res.json())
}

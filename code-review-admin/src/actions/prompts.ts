"use server"

import type { Prompt } from "@/src/utils/prompts"

export const getPrompts = async () => {
    return fetch(`${process.env.API_URL}/api/prompts`, {
        headers: {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        }
    }).then(res => res.json())
}

export const createPrompt = async (prompt: Prompt) => {
    return fetch(`${process.env.API_URL}/api/prompts`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(prompt)
    }).then(res => res.json())
}

export const updatePrompt = async (prompt: Partial<Prompt>) => {
    return fetch(`${process.env.API_URL}/api/prompts/${prompt.name}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(prompt)
    }).then(res => res.json())
}

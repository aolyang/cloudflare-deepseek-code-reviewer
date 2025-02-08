"use server"

import { getCloudflareContext } from "@opennextjs/cloudflare"

export async function savePrompt(key: string, value: string) {
    const prompts = getCloudflareContext().env.prompts
    prompts.put(key, value)
}

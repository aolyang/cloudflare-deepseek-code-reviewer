import type { Prompt } from "@/src/utils/api"

export function downloadPrompts(prompts: Prompt[]) {
    const blob = new Blob([JSON.stringify(prompts, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "prompts.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

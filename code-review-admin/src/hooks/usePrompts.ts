import type React from "react"

import { useState } from "react"

import { getPrompts, importPrompts } from "@/src/actions/prompts"
import type { Prompt } from "@/src/utils/api"
import { downloadPrompts } from "@/src/utils/downloadPrompts"

export default function usePrompts() {

    const [prompts, setPrompts] = useState<Prompt[]>([])
    const refreshList = () => {
        getPrompts().then(result => {
            setPrompts(result.prompts)
        })
    }

    const handleDownload = () => {
        downloadPrompts(prompts)
    }

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const content = e.target?.result as string
                const importedPrompts = JSON.parse(content)
                await importPrompts(importedPrompts)
                refreshList()
            }
            reader.readAsText(file)
        }
    }
    return {
        prompts,
        refreshList,
        handleDownload,
        handleImport
    }
}

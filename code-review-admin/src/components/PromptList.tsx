"use client"

import { useEffect, useState } from "react"

import { getPrompts } from "@/src/actions/prompts"
import PromptCard from "@/src/components/PromptCard"
import type { Prompt } from "@/src/utils/prompts"

const PromptList = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([])

    useEffect(() => {
        getPrompts().then(result => {
            setPrompts(result.prompts)
        })
    }, [])

    return (
        <div>
            {prompts.map((prompt) => (
                <PromptCard key={prompt.name} prompt={prompt}/>
            ))}
        </div>
    )
}

export default PromptList

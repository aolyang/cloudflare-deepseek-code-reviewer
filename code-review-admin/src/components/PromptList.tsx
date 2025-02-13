"use client"

import { useEffect, useState } from "react"
import PromptCard from "@/src/components/PromptCard"

const PromptList = () => {
    const [prompts, setPrompts] = useState([])

    useEffect(() => {
        async function fetchPrompts() {
            const response = await fetch(process.env.API_URL + "/api/prompts")
            const data = await response.json()
            setPrompts(data.prompts)
        }

        fetchPrompts()
    }, [])

    return (
        <div>
            {prompts.map((prompt) => (
                <PromptCard key={prompt.name} prompt={prompt} />
            ))}
        </div>
    )
}

export default PromptList

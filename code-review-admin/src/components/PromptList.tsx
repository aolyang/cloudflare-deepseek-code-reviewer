"use client"

import { useEffect, useState } from "react"
import { Button } from "@mui/material"

import { getPrompts } from "@/src/actions/prompts"
import PromptCard from "@/src/components/PromptCard"
import ModifyPromptDialog from "@/src/components/ModifyPromptDialog"
import type { Prompt } from "@/src/utils/prompts"

const PromptList = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getPrompts().then(result => {
            setPrompts(result.prompts)
        })
    }, [])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button onClick={handleOpen}>Add Prompt</Button>
            {prompts.map((prompt) => (
                <PromptCard key={prompt.name} prompt={prompt}/>
            ))}
            <ModifyPromptDialog open={open} onClose={handleClose} />
        </div>
    )
}

export default PromptList

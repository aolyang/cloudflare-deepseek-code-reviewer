"use client"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"

import { getPrompts } from "@/src/actions/prompts"
import ModifyPromptDialog from "@/src/components/ModifyPromptDialog"
import PromptCard from "@/src/components/PromptCard"
import type { Prompt } from "@/src/utils/prompts"

const PromptList = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([])
    const [open, setOpen] = useState(false)

    const refreshList = () => {
        getPrompts().then(result => {
            setPrompts(result.prompts)
        })
    }
    useEffect(() => {
        refreshList()
    }, [])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button onClick={handleOpen}>Add Prompt</Button>
            {prompts.map((prompt) => (
                <PromptCard key={prompt.name} prompt={prompt} onFetch={refreshList}/>
            ))}
            <ModifyPromptDialog open={open} onClose={handleClose} onFetch={refreshList}/>
        </div>
    )
}

export default PromptList

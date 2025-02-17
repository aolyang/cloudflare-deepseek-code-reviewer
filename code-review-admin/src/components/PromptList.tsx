"use client"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"

import { getPrompts } from "@/src/actions/prompts"
import ModifyPromptDialog from "@/src/components/ModifyPromptDialog"
import PromptCard from "@/src/components/PromptCard"
import type { Prompt } from "@/src/utils/api"
import { downloadPrompts } from "@/src/utils/downloadPrompts"

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

    const handleDownload = () => {
        downloadPrompts(prompts)
    }

    return (
        <div style={{ height: "calc(100% - 40px)" }}>
            <Button onClick={handleOpen}>Add Prompt</Button>
            <Button onClick={handleDownload}>Download Prompts</Button>
            <div className={"flex flex-col gap-4 px-1 -m-1 py-2 overflow-y-auto"} style={{ height: "calc(100% - 31px)" }}>
                {prompts.map((prompt) => (
                    <PromptCard key={prompt.name} prompt={prompt} onFetch={refreshList} />
                ))}
                <ModifyPromptDialog open={open} onClose={handleClose} onFetch={refreshList} />
            </div>
        </div>
    )
}

export default PromptList

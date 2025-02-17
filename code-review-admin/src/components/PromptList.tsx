"use client"
import DownloadIcon from "@mui/icons-material/Download"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"

import { getPrompts, importPrompts } from "@/src/actions/prompts"
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

    return (
        <div style={{ height: "calc(100% - 40px)" }}>
            <div className={"flex gap-2"}>
                <Button onClick={handleOpen}>Add Prompt</Button>
                <Button startIcon={<DownloadIcon />} color={"inherit"} onClick={handleDownload}>Download Prompts</Button>
                <Button component="label" color={"inherit"}>
                    Import Prompts
                    <input type="file" accept=".json" hidden onChange={handleImport} />
                </Button>
            </div>
            <div className={"flex flex-col gap-4 px-1 -m-1 py-2 overflow-y-auto"}
                style={{ height: "calc(100% - 31px)" }}>
                {prompts.map((prompt) => (
                    <PromptCard key={prompt.name} prompt={prompt} onFetch={refreshList}/>
                ))}
                <ModifyPromptDialog open={open} onClose={handleClose} onFetch={refreshList}/>
            </div>
        </div>
    )
}

export default PromptList

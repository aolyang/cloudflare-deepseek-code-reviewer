"use client"
import DownloadIcon from "@mui/icons-material/Download"
import UploadIcon from "@mui/icons-material/Upload"
import { Button } from "@mui/material"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"

import ModifyPromptDialog from "@/src/components/ModifyPromptDialog"
import PromptCard from "@/src/components/PromptCard"
import usePrompts from "@/src/hooks/usePrompts"

const PromptList = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const { prompts, refreshList, handleImport, handleDownload } = usePrompts()

    useEffect(() => {
        refreshList()
        // eslint-disable-next-line
    }, [])

    const { data: session } = useSession()
    const download = (
        <Button
            startIcon={<DownloadIcon/>}
            color={"inherit"}
            onClick={handleDownload}>
            Download Prompts
        </Button>
    )
    return (
        <div style={{ height: "calc(100% - 40px)" }}>
            <div className={"flex gap-2"}>
                {session?.user ? (
                    <>
                        <Button onClick={handleOpen}>Add Prompt</Button>
                        {download}
                        <Button startIcon={<UploadIcon/>} component="label" color={"inherit"}>
                            Import Prompts
                            <input type="file" accept=".json" hidden onChange={handleImport}/>
                        </Button>
                    </>
                ) : download}
            </div>
            <div
                className={"flex flex-col gap-4 px-1 -m-1 py-2 overflow-y-auto"}
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

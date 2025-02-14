import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid2 as Grid,
    Typography
} from "@mui/material"
import React from "react"

import { deletePrompt } from "@/src/actions/prompts"
import type { Prompt } from "@/src/utils/api"

type ConfirmDeletePromptDialogProps = {
    open: boolean
    onClose: () => void
    onFetch: () => void
    prompt?: Prompt
}

const ConfirmDeletePromptDialog = ({
    open, onClose, onFetch, prompt
}: ConfirmDeletePromptDialogProps) => {
    const handleDelete = async () => {
        if (prompt) {
            await deletePrompt(prompt.name)
            onFetch()
            onClose()
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Confirm Delete
                {prompt?.name && <span className={"ml-2 text-red-700 dark:text-red-500"}>/{prompt.name}</span>}
                ?
            </DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete the prompt &#34;{prompt?.name}&#34;?</Typography>
                <p className={"text-[18px] font-medium mt-1"}>model</p>
                <Typography color={"text.secondary"}>{prompt?.model}</Typography>
                <p className={"text-[18px] font-medium mt-1"}>messages</p>
                <Grid container columnSpacing={2}>
                    {prompt?.messages.map((message, index) => (
                        <React.Fragment key={index}>
                            <Grid size={2}>{message.role}</Grid>
                            <Grid size={10} color={"text.secondary"}>{message.content}</Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleDelete} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeletePromptDialog

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"

import { deletePrompt } from "@/src/actions/prompts"
import type { Prompt } from "@/src/utils/prompts"

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
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete the prompt &#34;{prompt?.name}&#34;?</Typography>
                <DialogContentText>
                    <Typography>command: /{prompt?.name}</Typography>
                    <Typography>model: {prompt?.model}</Typography>
                    {prompt?.messages.map((message, index) => (
                        <Typography key={index}>{message.role} {"{  " + message.content + "  }"}</Typography>
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleDelete} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeletePromptDialog

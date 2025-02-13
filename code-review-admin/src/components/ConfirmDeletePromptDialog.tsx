import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

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
                Are you sure you want to delete the prompt &#34;{prompt?.name}&#34;?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleDelete} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeletePromptDialog

import AddIcon from "@mui/icons-material/Add"
import { Card, CardContent, Chip, IconButton, Tooltip, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useState } from "react"

import ModifyPromptDialog from "@/src/components/ModifyPromptDialog"
import type { Model } from "@/src/utils/api"

type ModelCardProps = {
    model: Model
    onModelTaskNameClick: () => void
}

export default function ModelCard({ model, onModelTaskNameClick }: ModelCardProps) {
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Card key={model.id} className={"relative"}>
            <CardContent>
                <Typography variant="h6" component="div">{model.name}</Typography>
                <Tooltip title={model.task.description} placement={"bottom-start"}>
                    <Chip label={model.task.name} size={"small"} onClick={onModelTaskNameClick} />
                </Tooltip>
                <Typography variant="body2" color="text.secondary">{model.description}</Typography>
                {session?.user && (
                    <IconButton onClick={handleOpen} style={{ position: "absolute", top: 0, right: 0 }}>
                        <AddIcon />
                    </IconButton>
                )}
                {open && session?.user && (
                    <ModifyPromptDialog
                        open={open}
                        onClose={handleClose}
                        onFetch={() => {}}
                        prompt={{ model: model.name }}
                    />
                )}
            </CardContent>
        </Card>
    )
}

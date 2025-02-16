import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import SettingsIcon from "@mui/icons-material/Settings"
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"
import { Card, CardContent, IconButton, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useState } from "react"

import ConfirmDeletePromptDialog from "@/src/components/ConfirmDeletePromptDialog"
import ModifyPromptDialog from "@/src/components/ModifyPromptDialog"
import type { Prompt } from "@/src/utils/api"

type PromptCardProps = {
    prompt: Prompt
    onFetch: () => void
}

const PromptCard = ({ prompt, onFetch }: PromptCardProps) => {
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleDeleteOpenClose = () => setDeleteOpen(false)
    return (
        <Card>
            <CardContent className={"relative flex flex-col "}>
                <ModifyPromptDialog open={open} onClose={handleClose} prompt={prompt} onFetch={onFetch} />
                <ConfirmDeletePromptDialog
                    open={deleteOpen}
                    onClose={handleDeleteOpenClose}
                    onFetch={onFetch}
                    prompt={prompt}
                />
                {session?.user ?
                    <div className={"absolute right-0 top-0"}>
                        <IconButton color={"error"}
                            onClick={() => setDeleteOpen(true)}><DeleteForeverIcon /></IconButton>
                        <IconButton onClick={handleOpen}><SettingsIcon /></IconButton>
                    </div>
                    : null
                }
                <Typography variant="h5" component="div">/{prompt.name}</Typography>
                <Typography className={"py-2"} variant="body2" color="text.secondary">{prompt.description}</Typography>
                <Typography variant="body2" color="text.secondary">
                    <AutoAwesomeIcon className={"mr-2"} />{prompt.model || "(No Model Select !!!)"}
                </Typography>
                <hr className={"my-1"} />
                {prompt.messages.map((message, index) => (
                    <Typography
                        key={index}
                        className={"flex items-center gap-2"}
                        component={"div"}
                        variant="body2"
                        color="text.secondary"
                        title={message.content}
                    >
                        {message.role === "system"
                            ? <SettingsSuggestIcon style={{ fontSize: "1.5rem", marginTop: "-3px" }} />
                            : <TipsAndUpdatesIcon style={{ fontSize: "1.5rem" }} />
                        }
                        <Typography
                            component={"p"}
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {message.content}
                        </Typography>
                    </Typography>
                ))}
            </CardContent>
        </Card>
    )
}

export default PromptCard

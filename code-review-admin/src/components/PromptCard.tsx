import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import SettingsIcon from "@mui/icons-material/Settings"
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"
import { Card, CardContent, IconButton, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useState } from "react"

import ModifyPromptDialog from "@/src/components/ModifyPromptDialog"
import type { Prompt } from "@/src/utils/prompts"

type PromptCardProps = {
    prompt: Prompt
    onFetch: () => void
}

const PromptCard = ({ prompt, onFetch }: PromptCardProps) => {
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Card>
            <CardContent className={"relative"}>
                <ModifyPromptDialog open={open} onClose={handleClose} prompt={prompt} onFetch={onFetch}/>
                {session?.user ?
                    <div className={"absolute right-0 top-0"}>
                        <IconButton color={"error"}><DeleteForeverIcon /></IconButton>
                        <IconButton onClick={handleOpen}><SettingsIcon/></IconButton>
                    </div>
                    : null
                }
                <Typography variant="h5" component="div">/{prompt.name}</Typography>
                <Typography variant="body2" color="text.secondary">{prompt.description}</Typography>
                <hr className={"my-2"}/>
                {prompt.messages.map((message, index) => (
                    <Typography
                        key={index}
                        className={"flex items-center gap-2 py-1"}
                        variant="body2"
                        color="text.secondary"
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {message.role === "system"
                            ? <SettingsSuggestIcon style={{ fontSize: "1.5rem", marginTop: "-3px" }}/>
                            : <TipsAndUpdatesIcon style={{ fontSize: "1.5rem" }}/>
                        }
                        {message.content}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    )
}

export default PromptCard

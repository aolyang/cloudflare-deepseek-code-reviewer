import SettingsIcon from "@mui/icons-material/Settings"
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"
import { Card, CardContent, IconButton, Typography } from "@mui/material"
import { useSession } from "next-auth/react"

type Prompt = {
    name: string
    description: string
    messages: { role: string; content: string }[]
}

type PromptCardProps = {
    prompt: Prompt
}

const PromptCard = ({ prompt }: PromptCardProps) => {
    const { data: session } = useSession()
    return (
        <Card>
            <CardContent className={"relative"}>
                {session?.user ?
                    <div className={"absolute right-0 top-0"}>
                        <IconButton><SettingsIcon/></IconButton>
                    </div> : null
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

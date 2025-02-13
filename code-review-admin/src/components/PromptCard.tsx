import { Card, CardContent, Typography } from "@mui/material"

type Prompt = {
    name: string
    description: string
    messages: { role: string, content: string }[]
}

type PromptCardProps = {
    prompt: Prompt
}

const PromptCard = ({ prompt }: PromptCardProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {prompt.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {prompt.description}
                </Typography>
                {prompt.messages.map((message, index) => (
                    <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {message.content}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    )
}

export default PromptCard

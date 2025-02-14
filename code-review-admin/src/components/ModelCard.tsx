import { Card, CardContent, Chip, Tooltip, Typography } from "@mui/material"

import type { Model } from "@/src/utils/models"

type ModelCardProps = {
    model: Model
    onModelTaskSelect: (taskName: string) => void
}

export default function ModelCard({ model, onModelTaskSelect }: ModelCardProps) {
    return (
        <Card key={model.id} style={{ width: "100%" }}>
            <CardContent>
                <Typography variant="h6" component="div">{model.name}</Typography>
                <Tooltip title={model.task.description} placement={"bottom-start"}>
                    <Chip label={model.task.name} size={"small"} onClick={() => onModelTaskSelect(model.task.name)} />
                </Tooltip>
                <Typography variant="body2" color="text.secondary">{model.description}</Typography>
            </CardContent>
        </Card>
    )
}

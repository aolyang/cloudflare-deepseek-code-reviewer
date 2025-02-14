import { Card, CardContent, Chip, Tooltip, Typography } from "@mui/material"

import type { Model } from "@/src/utils/models"

type ModelCardProps = {
    model: Model
}

export default function ModelCard({ model }: ModelCardProps) {
    return (
        <Card key={model.id} style={{ width: "100%" }}>
            <CardContent>
                <Typography variant="h6" component="div">{model.name}</Typography>
                <Tooltip title={model.task.description} placement={"bottom-start"}>
                    <Chip label={model.task.name} size={"small"} />
                </Tooltip>
                <Typography variant="body2" color="text.secondary">{model.description}</Typography>
            </CardContent>
        </Card>
    )
}

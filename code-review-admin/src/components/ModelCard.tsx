import { Card, CardContent, Typography, Chip } from "@mui/material"
import { Model } from "@/src/utils/models"

type ModelCardProps = {
    model: Model
}

export default function ModelCard({ model }: ModelCardProps) {
    return (
        <Card key={model.id} style={{ width: "100%", maxWidth: "300px" }}>
            <CardContent>
                <Typography variant="h5" component="div">{model.name}</Typography>
                <Typography variant="body2" color="text.secondary">{model.description}</Typography>
                <Chip label={model.task.name} style={{ marginTop: "8px" }} />
                <Typography variant="body2" color="text.secondary" style={{ marginTop: "8px" }}>{model.task.description}</Typography>
            </CardContent>
        </Card>
    )
}

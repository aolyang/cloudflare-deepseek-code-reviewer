import { Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import { getModels } from "@/src/actions/models"
import ModelCard from "@/src/components/ModelCard"

export default function ModelList() {
    const [models, setModels] = useState([])

    useEffect(() => {
        getModels().then(result => {
            setModels(result.models)
        })
    }, [])

    return (
        <Container maxWidth={"md"}>
            <Typography variant="h4" component="h1" gutterBottom>
                Cloudflare Available Models
            </Typography>
            <div className={"flex flex-wrap gap-4"}>
                {models.map((model) => (
                    <ModelCard key={model.id} model={model} />
                ))}
            </div>
        </Container>
    )
}

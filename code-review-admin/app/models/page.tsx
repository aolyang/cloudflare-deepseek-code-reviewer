import { useEffect, useState } from "react"

import { getModels } from "@/src/actions/models"
import ModelCard from "@/src/components/ModelCard"

export default function ModelsPage() {
    const [models, setModels] = useState([])

    useEffect(() => {
        getModels().then(result => {
            setModels(result.models)
        })
    }, [])

    return (
        <div className={"flex flex-wrap gap-4"}>
            {models.map((model) => (
                <ModelCard key={model.id} model={model} />
            ))}
        </div>
    )
}

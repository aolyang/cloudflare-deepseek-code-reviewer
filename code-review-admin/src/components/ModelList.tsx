"use client"
import { useEffect, useState } from "react"

import { getModels } from "@/src/actions/models"
import ModelCard from "@/src/components/ModelCard"
import type { Model } from "@/src/utils/models"

export default function ModelsList() {
    const [models, setModels] = useState<Model[]>([])

    useEffect(() => {
        getModels().then(result => setModels(result.models))
    }, [])

    return (
        <div className={"flex flex-wrap gap-4"}>
            {models.map((model) => (
                <ModelCard key={model.id} model={model} />
            ))}
        </div>
    )
}

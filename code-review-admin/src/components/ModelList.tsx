"use client"
import { useEffect, useState } from "react"

import { getModels } from "@/src/actions/models"
import ModelCard from "@/src/components/ModelCard"
import type { Model } from "@/src/utils/models"

export default function ModelsList({ search, taskName, page }) {
    const [models, setModels] = useState<Model[]>([])
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        getModels(search, taskName, page, perPage).then(result => setModels(result.models))
    }, [search, taskName, page, perPage])

    return (
        <div className={"flex flex-wrap gap-4"}>
            {models.map((model) => (
                <ModelCard key={model.id} model={model} />
            ))}
        </div>
    )
}

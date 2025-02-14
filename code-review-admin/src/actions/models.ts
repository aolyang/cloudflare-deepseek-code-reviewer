"use server"

import type { Model } from "@/src/utils/models"

export const getModels = async (search = "", taskName = "", page = 1, per_page = 10): Promise<{
    models: Model[]
    result_info: {
        page: number
        per_page: number
        count: number
        total_count: number
    }
}> => {
    const query = new URLSearchParams({ search, taskName, page: page.toString(), per_page: per_page.toString() })
    return fetch(`${process.env.API_URL}/api/public/models?${query.toString()}`).then(res => res.json())
}

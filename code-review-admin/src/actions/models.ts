"use server"

export const getModels = async (search = "", page = 1, per_page = 10): Promise<{
    models: {
        id: string
        name: string
        description: string
        task: {
            id: string
            name: string
            description: string
        }
    }[]
    result_info: {
        page: number
        per_page: number
        total_pages: number
        count: number
        total_count: number
    }
}> => {
    const query = new URLSearchParams({ search, page: page.toString(), per_page: per_page.toString() })
    return fetch(`${process.env.API_URL}/api/public/models?${query.toString()}`).then(res => res.json())
}

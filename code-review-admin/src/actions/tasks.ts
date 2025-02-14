"use server"

import type { Task } from "@/src/utils/api"

export const getTasks = async (): Promise<{ tasks: Task[] }> => {
    return fetch(`${process.env.API_URL}/api/public/tasks`).then(res => res.json())
}

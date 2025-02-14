export interface Task {
    id: string
    name: string
    description: string
}

export interface Model {
    id: string
    name: string
    description: string
    task: Task
}

export interface Prompt {
    name: string
    description: string
    model: string
    messages: { role: string; content: string }[]
}

export interface PageResultInfo {
    count: number
    page: number
    per_page: number
}

export const defaultPageResultInfo: PageResultInfo = {
    count: 0,
    page: 1,
    per_page: 10
}

export const commonHeaders = {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    "Content-Type": "application/json"
}

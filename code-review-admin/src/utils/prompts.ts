export interface Prompt {
    name: string
    description: string
    model: string
    messages: { role: string, content: string }[]
}

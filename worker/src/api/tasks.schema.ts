import { z } from "zod"

export const TaskSchema = z.object({
    id:          z.string().openapi({ description: "ID", example: "c329a1f9-323d-4e91-b2aa-582dd4188d34" }),
    name:        z.string().openapi({ description: "Name", example: "Text Generation" }),
    description: z.string().openapi({ description: "Description", example: "Good at text generation" })
})

export const TasksResponseSchema = z.object({
    tasks: z.array(TaskSchema).openapi({ description: "List of tasks" })
})

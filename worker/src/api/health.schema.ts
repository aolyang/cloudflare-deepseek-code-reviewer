import { z } from "zod"

export const HealthResponseSchema = z.object({
    status: z.string().openapi({ description: "Status", example: "ok" }),
    name:   z.string().openapi({ description: "Name", example: "user name" })
})

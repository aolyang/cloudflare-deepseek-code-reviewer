import { z } from "zod"

export const pageQuerySchema = z.object({
    page:     z.coerce.number().optional().openapi({ description: "Page number", example: 1 }),
    per_page: z.coerce.number().optional().openapi({ description: "Number of items per page", example: 20 })
})

export const pageResponseSchema = z.object({
    page:        z.number().openapi({ description: "Page Index" }),
    per_page:    z.number().openapi({ description: "Number of items per page" }),
    count:       z.number().openapi({ description: "Items count of this page" }),
    total_count: z.number().openapi({ description: "Total count items count" })
})

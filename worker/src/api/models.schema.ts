import { z } from "zod"

export const querySchema = z
    .object({
        page: z.number().optional().openapi({ description: "Page number", example: 1 }),
        per_page: z.number().optional().openapi({ description: "Number of items per page", example: 20 }),
        search: z.string().optional().openapi({ description: "Search query", example: "llama2" })
    })
    .openapi({ ref: "Query" })


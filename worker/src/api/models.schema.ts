import { z } from "zod"

import { pageQuerySchema, pageResponseSchema } from "./_.schema"

export const ModelSchema = z.object({
    id:          z.string().openapi({ description: "Model ID" }),
    name:        z.string().openapi({ description: "Model name" }),
    description: z.string().openapi({ description: "Model description" }),
    version:     z.string().openapi({ description: "Model version" }),
    created_at:  z.string().openapi({ description: "Model creation date" }),
    updated_at:  z.string().openapi({ description: "Model update date" })
})

export const ModelQuerySchema = z.object({
    model: z.string().openapi({ description: "Model name", example: "deepseek-coder-6.7b-instruct-awq" })
})

export const ModelsQuerySchema = z
    .object({
        search: z.string().optional().openapi({ description: "Search query", example: "deepseek-coder-6.7b-instruct-awq" })
    })
    .merge(pageQuerySchema)

export const ModelsResponseSchema = z.object({
    models: z.array(ModelSchema),
    result_info: pageResponseSchema
})

import { z } from "zod"

import { pageQuerySchema, pageResponseSchema } from "./_.schema"

const model = "deepseek-r1-distill-qwen-32b"

export const recommendedModel = {
    name: model,
    cfName: `@cf/deepseek-ai/${model}`,
    description: "DeepSeek-R1-Distill-Qwen-32B is a model distilled from DeepSeek-R1 based on Qwen2.5. It outperforms OpenAI-o1-mini across various benchmarks, achieving new state-of-the-art results for dense models.",
    task: {
        name: "Text Generation",
        description: "Family of generative text models, such as large language models (LLM), that can be adapted for a variety of natural language tasks."
    }
}

export const ModelTaskSchema = z.object({
    id:          z.string().openapi({ description: "ID", example: "c329a1f9-323d-4e91-b2aa-582dd4188d34" }),
    name:        z.string().openapi({ description: "name", example: recommendedModel.task.name }),
    description: z.string().openapi({ description: "description", example: recommendedModel.task.description })
})

export const ModelSchema = z.object({
    id:              z.string().openapi({ description: "ID", example: "ad01ab83-baf8-4e7b-8fed-a0a219d4eb45" }),
    name:            z.string().openapi({ description: "name", example: recommendedModel.cfName }),
    description:     z.string().openapi({ description: "description", example: recommendedModel.description })
}).merge(z.object({
    task: ModelTaskSchema
}))

export const ModelQuerySchema = z.object({
    model: z.string().openapi({ description: "Model name", example: recommendedModel.name })
})

export const ModelsQuerySchema = z.object({
    search: z.string().optional().openapi({ description: "Search query", example: recommendedModel.name })
}).merge(pageQuerySchema)

export const ModelsResponseSchema = z.object({
    models: z.array(ModelSchema),
    result_info: pageResponseSchema
})

import { z } from "zod"

import { recommendedModel } from "./models.schema"

export const RoleSchema = z.object({
    role:    z.union([ z.literal("system"), z.literal("user"), z.literal("assistant")]).openapi({ description: "Role", example: "system" }),
    content: z.string().openapi({ description: "Content of the message", example: "act as a pro engineer" })
})

export const PromptSchema = z.object({
    name:        z.string().openapi({ description: "Name of the prompt", example: "explain" }),
    description: z.string().openapi({ description: "Description of the prompt.", example: "explain content ...." }),
    model:       z.string().openapi({ description: "Model used for the prompt. For more details, visit https://developers.cloudflare.com/workers-ai/models/",
        example: recommendedModel.cfName
    }),
    messages:    z.array(RoleSchema).openapi({ description: "Messages in the prompt" })
}).openapi({ example: {
    name:        "explain",
    description: "explain content ....",
    model:       recommendedModel.cfName,
    messages:    [
        { role:  "system", content: "act as a pro engineer" },
        { role:  "user", content: "explain content" },
        { role:  "assistant", content: "here is the example: \n\n[ ]: **Task 1**: ..." }
    ]
}})

export const ResponsePromptsSchema = z.object({
    prompts: z.array(PromptSchema).openapi({ description: "List of prompts" })
})

export type Prompt = z.infer<typeof PromptSchema>

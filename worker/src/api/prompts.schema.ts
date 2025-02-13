import { z } from "zod"
import { recommendedModel } from "./models.schema"

export const promptSchema = z.object({
  name: z.string().openapi({ description: "Name of the prompt", example: "explain" }),
  description: z.string().openapi({ description: "Description of the prompt.", example: "explain content ...." }),
  model: z.string().openapi({ description: "Model used for the prompt. For more details, visit https://developers.cloudflare.com/workers-ai/models/", example: recommendedModel.cfName }),
  messages: z.array(z.object({
    role: z.string().openapi({ description: "Role of the message", example: "system" }),
    content: z.string().openapi({ description: "Content of the message", example: "..." })
  })).openapi({ description: "Messages in the prompt" })
})

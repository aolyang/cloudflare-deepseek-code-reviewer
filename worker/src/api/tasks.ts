import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver } from "hono-openapi/zod"

import { cloudflare } from "../utils/cloudflare"
import { TasksResponseSchema } from "./tasks.schema"

const tasks = new Hono<{ Bindings: CloudflareEnv }>()

tasks.get("/",
    describeRoute({
        description: "List all tasks",
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: resolver(TasksResponseSchema)
                    }
                }
            }
        }
    }),
    async (c) => {
        const response = await cloudflare(c).ai.tasks.list({ account_id: c.env.ACCOUNT_ID })
        const { result } = response

        return c.json({ tasks: result })
    }
)

export default tasks

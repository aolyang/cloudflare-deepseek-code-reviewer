import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver } from "hono-openapi/zod"

import { cloudflare } from "../utils/cloudflare"
import { HealthResponseSchema } from "./health.schema"

const health = new Hono<{ Bindings: CloudflareEnv }>()

health.get("/",
    describeRoute({
        description: "Check worker api health",
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: resolver(HealthResponseSchema)
                    }
                }
            }
        }
    }),
    async (c) => {
        const account = await cloudflare(c).accounts.get({ account_id: c.env.ACCOUNT_ID }) as { id: string; name: string }
        return c.json({ status: "ok", name: account?.name })
    })

export default health

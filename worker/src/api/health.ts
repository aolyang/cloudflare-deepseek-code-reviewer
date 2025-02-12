import { Hono } from "hono"

import { cloudflare } from "../utils/cloudflare"

const health = new Hono<{ Bindings: CloudflareEnv }>()

health.get("/", async (c) => {
    const account = await cloudflare(c).accounts.get({ account_id: c.env.ACCOUNT_ID }) as { id: string; name: string }
    return c.json({ status: "healthy", name: account?.name })
})

export default health

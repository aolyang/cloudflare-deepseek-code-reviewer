import { Hono } from "hono"
import cloudflare from "../utils/cloudflare"

const health = new Hono<{ Bindings: CloudflareEnv }>()

health.get("/", async (c) => {
  const accountId = c.env.ACCOUNT_ID
  const response = await cloudflare.accounts.get({ account_id: accountId })
  return c.json({ status: "healthy", account: response })
})

export default health

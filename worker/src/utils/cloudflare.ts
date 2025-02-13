import type { Context } from "hono"

import Cloudflare from "cloudflare"

export const cloudflare = (
    ctx: Context<{ Bindings: CloudflareEnv }>
) =>
    new Cloudflare({
        apiEmail: ctx.env.CLOUDFLARE_EMAIL,
        apiKey: ctx.env.CLOUDFLARE_API_KEY
    })

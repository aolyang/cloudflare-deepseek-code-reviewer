import type { Context } from "hono"

import Cloudflare from "cloudflare"

export const recommendedModel = "deepseek-r1-distill-qwen-32b"

export const cloudflare = (
    ctx: Context<{ Bindings: CloudflareEnv }>
) =>
    new Cloudflare({
        apiEmail: ctx.env.CLOUDFLARE_EMAIL,
        apiKey: ctx.env.CLOUDFLARE_API_KEY
    })

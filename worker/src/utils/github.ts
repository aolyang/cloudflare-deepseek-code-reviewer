import type { Context } from "hono"

import { App } from "@octokit/app"

// convert private key to pkcs8 format before you use it
// openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in your-private-key.pem -out out.pkcs8.pem
// care about -topk8, it's do a forcely convert no matter key content is crypt or non-standard

// https://github.com/octokit/app.js/?tab=readme-ov-file#usage
export const githubApp = (
    ctx: Context<{ Bindings: CloudflareEnv }>
) => new App({
    appId: ctx.env.GITHUB_APP_ID,
    privateKey: ctx.env.GITHUB_APP_PRIVATE_KEY,
    oauth: {
        clientId: ctx.env.GITHUB_APP_OAUTH_CLIENT_ID,
        clientSecret: ctx.env.GITHUB_APP_OAUTH_CLIENT_SECRET
    },
    webhooks: {
        secret: ctx.env.GITHUB_APP_WEBHOOK_SECRET
    }
})

export type GitHubApp = ReturnType<typeof githubApp>

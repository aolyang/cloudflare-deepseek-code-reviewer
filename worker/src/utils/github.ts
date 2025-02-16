import type { Context } from "hono"

import { App } from "@octokit/app"

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

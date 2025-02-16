interface CloudflareEnv {
    prompts: KVNamespace
    AI: Ai

    ACCOUNT_ID: string
    CLOUDFLARE_EMAIL: string
    CLOUDFLARE_API_KEY: string

    // api request permission token
    AUTH_TOKEN: string

    // GitHub App info
    GITHUB_APP_ID: string
    GITHUB_APP_OAUTH_CLIENT_ID: string
    GITHUB_APP_OAUTH_CLIENT_SECRET: string
    GITHUB_APP_WEBHOOK_SECRET: string
    GITHUB_APP_PRIVATE_KEY: string
}

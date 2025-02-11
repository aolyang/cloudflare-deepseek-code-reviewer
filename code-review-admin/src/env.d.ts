declare global {
    namespace NodeJS {
        interface ProcessEnv {
            AUTH_TOKEN: string
            API_URL: string

            WEBHOOK_PROXY_URL: string
            AUTH_GITHUB_ID: string
            AUTH_GITHUB_SECRET: string
            GITHUB_WEBHOOKS_SECRET: string
        }
    }
}

export {}

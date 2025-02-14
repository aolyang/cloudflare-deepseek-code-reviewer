declare global {
    namespace NodeJS {
        interface ProcessEnv {
            AUTH_TOKEN: string
            API_URL: string
        }
    }
}

export {}

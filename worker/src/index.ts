import "zod-openapi/extend"

import { apiReference } from "@scalar/hono-api-reference"
import { Hono } from "hono"
import { openAPISpecs } from "hono-openapi"

import codeReview from "./api/code-review"
import health from "./api/health"
import models from "./api/models"
import prompts from "./api/prompts"
import tasks from "./api/tasks"
import auth from "./middleware/auth"

const app = new Hono<{ Bindings: CloudflareEnv }>()

app.route("/", auth)
app.route("/health", health)

app.route("/api/public/models", models)
app.route("/api/public/tasks", tasks)
app.route("/api/prompts", prompts)
app.route("/api/code-review", codeReview)

const appName = "Cloudflare AI code review worker"

app.get("/schemas", openAPISpecs(app, {
    documentation: {
        info: {
            title: `${appName} schemas`,
            description: "Code review worker",
            version: "0.0.1"
        },
        servers: [
            { url: "http://localhost:8787", description: "local server" },
            { url: "https://cloudflare-deepseek-code-reviewer.aolyang.workers.dev", description: "production server" }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            { bearerAuth: [] }
        ]
    }
}))
app.get("/", apiReference({
    theme: "deepSpace",
    pageTitle: `${appName} docs`,
    spec: { url: "/schemas" }
}))
export default app

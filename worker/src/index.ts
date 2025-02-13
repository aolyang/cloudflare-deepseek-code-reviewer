import "zod-openapi/extend"

import { apiReference } from "@scalar/hono-api-reference"
import { Hono } from "hono"
import { openAPISpecs } from "hono-openapi"

import codeReview from "./api/code-review"
import health from "./api/health"
import models from "./api/models"
import auth from "./middleware/auth"

const app = new Hono<{ Bindings: CloudflareEnv }>()

app.route("/", auth)
app.route("/health", health)

app.route("/api/code-review", codeReview)
app.route("/api/public/models", models)

app.get("/schemas", openAPISpecs(app, {
    documentation: {
        info: {
            title: "Cloudflare AI code review worker OpenAPI docs",
            description: "Code review worker",
            version: "0.0.1"
        },
        servers: [
            { url: "http://127.0.0.1:8787", description: "local server" },
            { url: "https://cloudflare-deepseek-code-reviewer.aolyang.workers.dev", description: "production server" }
        ]
    }
}))
app.get("/", apiReference({
    theme: "deepSpace",
    spec: { url: "/schemas" }
}))
export default app

import { Hono } from "hono"

import codeReview from "./api/code-review"
import health from "./api/health"
import models from "./api/models"
import home from "./home"
import auth from "./middleware/auth"

const app = new Hono<{ Bindings: CloudflareEnv }>()

app.route("/", auth)

app.route("/", home)

app.route("/api/code-review", codeReview)

app.route("/api/public/models", models)
app.route("/api/public/health", health)

export default app

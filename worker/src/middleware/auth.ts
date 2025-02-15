import { Hono } from "hono"
import { bearerAuth } from "hono/bearer-auth"

const auth = new Hono<{ Bindings: CloudflareEnv }>()

auth.use("/api/*", (c, next) => {
    if (c.req.path.startsWith("/api/public")) return next()
    if (c.req.path.startsWith("/api/github")) return next()
    return bearerAuth({
        verifyToken: (token) => token === c.env.AUTH_TOKEN
    })(c, next)
})

export default auth

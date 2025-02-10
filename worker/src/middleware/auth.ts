import { Hono } from "hono"
import { bearerAuth } from "hono/bearer-auth"

const auth = new Hono<{ Bindings: CloudflareEnv }>()

auth.use("/*", (c, next) => {
    return bearerAuth({
        verifyToken: (token) => token === c.env.AUTH_TOKEN
    })(c, next)
})

export default auth

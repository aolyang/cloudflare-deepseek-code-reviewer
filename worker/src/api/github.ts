import { Hono } from "hono"

const github = new Hono<{ Bindings: CloudflareEnv }>()

github.post("/webhook")

export default github


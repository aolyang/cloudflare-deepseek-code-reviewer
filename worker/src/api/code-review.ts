import { Hono } from "hono"

const codeReview = new Hono<{ Bindings: CloudflareEnv }>()

export default codeReview


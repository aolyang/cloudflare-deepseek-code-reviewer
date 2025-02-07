import type { MetaFunction } from "@remix-run/cloudflare"

import { Button } from "@mui/material"

import Layout from "@/src/Layout"

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" }
    ]
}

export default function Index() {
    return (
        <Layout>
            <Button>Mui button</Button>
            <h1>Welcome to Remix!</h1>
            <p>
                Remix is a full-stack web framework for React. This is the home page.
            </p>
        </Layout>
    )
}

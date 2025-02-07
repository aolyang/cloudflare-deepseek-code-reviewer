import { withEmotionCache } from "@emotion/react"
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material"
import {
    isRouteErrorResponse,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError
} from "@remix-run/react"
import * as React from "react"
import { useContext } from "react"

import ClientStyleContext from "./src/ClientStyleContext"
import Layout from "./src/Layout"
import theme from "./src/theme"

interface DocumentProps {
    children: React.ReactNode
    title?: string
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext)

    // Only executed on client
    useEnhancedEffect(() => {
        // re-link sheet container
        emotionCache.sheet.container = document.head
        // re-inject tags
        const tags = emotionCache.sheet.tags
        emotionCache.sheet.flush()
        tags.forEach((tag) => {
            (emotionCache.sheet as any)._insertTag(tag)
        })
        // reset cache to reapply global styles
        clientStyleData.reset()
    }, [])

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <meta name="theme-color" content={theme.palette.primary.main}/>
                <title>{title ?? "Cloudflare deepseek code reviewer"}</title>
                <Meta/>
                <Links/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                />
                <meta name="emotion-insertion-point" content="emotion-insertion-point"/>
            </head>
            <body>
                <Layout>
                    {children}
                </Layout>
                <ScrollRestoration/>
                <Scripts/>
                <LiveReload/>
            </body>
        </html>
    )
})

// https://remix.run/docs/en/main/route/component
// https://remix.run/docs/en/main/file-conventions/routes
export default function App() {
    return (
        <Document>
            <Outlet/>
        </Document>
    )
}

// https://remix.run/docs/en/main/route/error-boundary
export function ErrorBoundary() {
    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        let message
        switch (error.status) {
            case 401:
                message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>
                break
            case 404:
                message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>
                break

            default:
                throw new Error(error.data || error.statusText)
        }

        return (
            <Document title={`${error.status} ${error.statusText}`}>
                <h1>
                    {error.status}: {error.statusText}
                </h1>
                {message}
            </Document>
        )
    }

    if (error instanceof Error) {
        console.error(error)
        return (
            <Document title="Error!">
                <div>
                    <h1>There was an error</h1>
                    <p>{error.message}</p>
                    <hr/>
                </div>
            </Document>
        )
    }

    return <h1>Unknown Error</h1>
}

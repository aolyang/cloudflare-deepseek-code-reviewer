import "./globals.css"

import type { Metadata } from "next"

import { Container } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import Link from "next/link"
import { SessionProvider } from "next-auth/react"
import React from "react"

import ClientThemeProvider from "@/src/components/ClientThemeProvider"
import Login2Github from "@/src/components/Login2Github"
import ToggleTheme from "@/src/components/ToggleTheme"

export const metadata: Metadata = {
    title: "AI code reviewer",
    description: "A code review tool powered by Cloudflare worker AI"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={"size-full"}>
                <SessionProvider>
                    <AppRouterCacheProvider>
                        <ClientThemeProvider>
                            <Container className={"size-full"} maxWidth={"sm"}>
                                <div className={"flex items-center"}>
                                    Cloudflare AI Code Review
                                    <div className={"flex-1"}/>
                                    <nav className={"flex gap-2 underline"}>
                                        <Link href="/">Home</Link>
                                        <Link href="/models">Models</Link>
                                    </nav>
                                    <ToggleTheme/>
                                    <Login2Github/>
                                </div>
                                <div style={{ height: "calc(100% - 40px)"}}>
                                    {children}
                                </div>
                            </Container>
                        </ClientThemeProvider>
                    </AppRouterCacheProvider>
                </SessionProvider>
            </body>
        </html>
    )
}

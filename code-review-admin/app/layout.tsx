import "./globals.css"

import type { Metadata } from "next"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { SessionProvider } from "next-auth/react"
import React from "react"
import Link from "next/link"

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
            <body>
                <SessionProvider>
                    <AppRouterCacheProvider>
                        <ClientThemeProvider>
                            <div className={"flex items-center"}>
                                Cloudflare AI Code Review
                                <div className={"flex-1"} />
                                <nav>
                                    <Link href="/">Home</Link>
                                    <Link href="/models">Models</Link>
                                </nav>
                                <ToggleTheme />
                                <Login2Github />
                            </div>
                            {children}
                        </ClientThemeProvider>
                    </AppRouterCacheProvider>
                </SessionProvider>
            </body>
        </html>
    )
}

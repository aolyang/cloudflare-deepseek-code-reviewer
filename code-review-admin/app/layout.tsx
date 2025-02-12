import "./globals.css"

import type { Metadata } from "next"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { SessionProvider } from "next-auth/react"
import React from "react"

import ClientThemeProvider from "@/src/components/ClientThemeProvider"

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
                            {children}
                        </ClientThemeProvider>
                    </AppRouterCacheProvider>
                </SessionProvider>
            </body>
        </html>
    )
}

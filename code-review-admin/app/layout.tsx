import "./globals.css"

import type { Metadata } from "next"

import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import React from "react"

import theme from "@/src/theme"

export const metadata: Metadata = {
    title: "AI code reviewer",
    description: "A code review tool powered by Cloudflare worker AI"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}

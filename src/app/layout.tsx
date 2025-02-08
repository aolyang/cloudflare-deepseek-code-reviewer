import "./globals.css"

import type { Metadata } from "next"

import React from "react"

export const metadata: Metadata = {
    title: "Cloudflare deepseek code review"
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}

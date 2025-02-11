"use client"

import type { ReactNode } from "react"

import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"

import theme from "@/src/theme"

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
}


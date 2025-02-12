"use client"

import type { ReactNode } from "react"

import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"

const storageMode = (localStorage.getItem("mui-mode") as "light" | "dark" | "system" | null) || "system"

const theme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
        colorSchemeSelector: "class"
    },
    palette: {
        mode: storageMode === "system" ? undefined : storageMode
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
                disableElevation: true,
                size: "small"
            }
        }
    }
})

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
}


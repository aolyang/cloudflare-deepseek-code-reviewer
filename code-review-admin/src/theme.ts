"use client"
import { createTheme } from "@mui/material/styles"

const storageMode = <"light" | "dark" | "system">localStorage.getItem("mui-mode") || "system"

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

export default theme

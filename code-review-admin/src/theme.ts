"use client"

import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    cssVariables: true,
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

import { createTheme } from "@mui/material"

// Create a theme instance.
const theme = createTheme({
    cssVariables: true,
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
                size: "small"
            }
        }
    }
})

export default theme

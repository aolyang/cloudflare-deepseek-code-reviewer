"use client"
import DarkModeIcon from "@mui/icons-material/Brightness4"
import LightModeIcon from "@mui/icons-material/LightMode"
import { IconButton, useColorScheme } from "@mui/material"

export default function ToggleTheme() {
    const { mode, setMode } = useColorScheme()

    const handleToggle = () => {
        setMode(mode === "light" ? "dark" : "light")
    }

    return (
        <IconButton onClick={handleToggle}>
            {mode === "light" ? <LightModeIcon/> : <DarkModeIcon/>}
        </IconButton>
    )
}

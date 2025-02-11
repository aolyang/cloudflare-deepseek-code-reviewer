"use client"
import DarkModeIcon from "@mui/icons-material/Brightness4"
import LightModeIcon from "@mui/icons-material/LightMode"
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness"
import { IconButton, useColorScheme, useMediaQuery } from "@mui/material"

export default function ToggleTheme() {
    const { mode, setMode } = useColorScheme()
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    const handleToggle = () => {
        setMode(mode === "light" ? "dark" : "light")
    }

    return (
        <IconButton onClick={handleToggle}>
            {mode === "system" ? <SettingsBrightnessIcon /> : null}
            {prefersDarkMode && mode === "dark" ? <DarkModeIcon /> : null}
            {mode === "light" ? <LightModeIcon /> : null}
        </IconButton>
    )
}

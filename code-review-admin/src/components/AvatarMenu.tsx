import type { MenuProps } from "@mui/material"

import { Menu } from "@mui/material"

export default function AvatarMenu(props: MenuProps) {
    return <Menu
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
            paper: {
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "&.MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                    },
                    "&::before": {
                        content: "\"\"",
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        backgroundColor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0
                    }
                }
            }

        }}
        {...props}
    />
}

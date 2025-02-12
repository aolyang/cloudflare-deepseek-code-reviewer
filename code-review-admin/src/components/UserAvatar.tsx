"use client"
import type { User } from "next-auth"

import AccountIcon from "@mui/icons-material/AccountCircle"
import LogoutIcon from "@mui/icons-material/Logout"
import { Avatar, ClickAwayListener, ListItemIcon, MenuItem, MenuList, styled } from "@mui/material"
import { signOut } from "next-auth/react"

import AvatarMenu from "@/src/components/AvatarMenu"
import useMenuTrigger from "@/src/hooks/useMenuTrigger"

const CuteAvatar = styled(Avatar)(() => ({
    width: 28,
    height: 28
}))

type Props = {
    user: User
}

export default function UserAvatar({ user }: Props) {
    const { anchor, open, handleClick, handleClose } = useMenuTrigger()
    return (
        <>
            {user.image ? (
                <CuteAvatar src={user.image} onClick={handleClick}/>
            ) : (
                <CuteAvatar onClick={handleClick}>{user.name?.[0] || "U"}</CuteAvatar>
            )}
            <AvatarMenu open={open} anchorEl={anchor}>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                        <MenuItem disableRipple disableTouchRipple>
                            <ListItemIcon><AccountIcon fontSize="small"/></ListItemIcon>
                            {user.name || "anonymous"}
                        </MenuItem>
                        <MenuItem onClick={() => signOut()}>
                            <ListItemIcon><LogoutIcon fontSize="small"/></ListItemIcon>
                            Sign out
                        </MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </AvatarMenu>
        </>
    )
}

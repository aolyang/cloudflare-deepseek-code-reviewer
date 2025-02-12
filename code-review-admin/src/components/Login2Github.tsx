"use client"
import GitHubIcon from "@mui/icons-material/GitHub"
import { Button } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react"

import UserAvatar from "@/src/components/UserAvatar"

export default function Login2Github() {
    const { data: session } = useSession()
    return (
        <form action={async () => {
            if (session) await signOut()
            else await signIn("github")
        }}>
            {session?.user ? (
                <UserAvatar user={session.user} />
            ) : (
                <Button
                    type={"submit"}
                    startIcon={<GitHubIcon/>}
                    style={{ backgroundColor: "#1c8139", color: "white", textTransform: "none" }}
                >
                    Login to Github
                </Button>
            )}
        </form>
    )
}

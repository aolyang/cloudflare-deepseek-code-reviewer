import GitHubIcon from "@mui/icons-material/GitHub"
import { Button } from "@mui/material"

import { signIn } from "@/src/utils/auth"

export default function Login2Github() {
    return (
        <form action={async () => {
            "use server"
            await signIn("github")
        }}>
            <Button
                type={"submit"}
                startIcon={<GitHubIcon />}
                style={{ backgroundColor: "#347d89", textTransform: "none" }}
            >
                Login to Github
            </Button>
        </form>
    )
}

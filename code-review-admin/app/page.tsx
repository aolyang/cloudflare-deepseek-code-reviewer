import GitHubIcon from "@mui/icons-material/GitHub"
import { Button, Container } from "@mui/material"

import ToggleTheme from "@/src/components/ToggleTheme"

export default function Home() {
    return (
        <Container maxWidth={"sm"}>
            <div className={"flex items-center"}>
                Cloudflare AI Code Review
                <div className={"flex-1"} />
                <ToggleTheme />
                <Button
                    startIcon={<GitHubIcon />}
                    style={{ backgroundColor: "#347d89", textTransform: "none" }}
                >
                    Login to Github
                </Button>
            </div>
        </Container>
    )
}

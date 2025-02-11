import GitHubIcon from "@mui/icons-material/GitHub"
import { Button, Container } from "@mui/material"

export default function Home() {
    return (
        <Container maxWidth={"sm"}>
            <div className={"flex justify-between items-center"}>
                AI Code Review
                <Button>
                    <GitHubIcon />
                    Login to Github
                </Button>
            </div>
        </Container>
    )
}

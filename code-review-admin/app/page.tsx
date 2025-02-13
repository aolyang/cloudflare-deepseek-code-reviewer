import { Container } from "@mui/material"

import Login2Github from "@/src/components/Login2Github"
import ToggleTheme from "@/src/components/ToggleTheme"
import PromptList from "@/src/components/PromptList"

export default function Home() {
    return (
        <Container maxWidth={"sm"}>
            <div className={"flex items-center"}>
                Cloudflare AI Code Review
                <div className={"flex-1"} />
                <ToggleTheme />
                <Login2Github />
            </div>
            <PromptList />
        </Container>
    )
}

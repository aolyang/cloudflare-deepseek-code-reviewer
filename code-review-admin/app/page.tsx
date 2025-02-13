import { Container } from "@mui/material"

import Login2Github from "@/src/components/Login2Github"
import PromptList from "@/src/components/PromptList"
import ToggleTheme from "@/src/components/ToggleTheme"

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

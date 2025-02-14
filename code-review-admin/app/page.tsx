import { Container } from "@mui/material"
import PromptList from "@/src/components/PromptList"

export default function Home() {
    return (
        <Container maxWidth={"sm"}>
            <PromptList />
        </Container>
    )
}

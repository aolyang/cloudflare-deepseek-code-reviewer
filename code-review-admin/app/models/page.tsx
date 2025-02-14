import { useState } from "react"
import { TextField, Select, MenuItem, InputLabel, FormControl, Container, Pagination } from "@mui/material"
import ModelsList from "@/src/components/ModelList"

export default function ModelsPage() {
    const [search, setSearch] = useState("")
    const [taskName, setTaskName] = useState("")
    const [page, setPage] = useState(1)

    const handleSearchChange = (event) => {
        if (event.key === "Enter") {
            setSearch(event.target.value)
        }
    }

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    return (
        <Container>
            <div className="toolbar">
                <FormControl>
                    <InputLabel>Task Name</InputLabel>
                    <Select value={taskName} onChange={handleTaskNameChange}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="task1">Task 1</MenuItem>
                        <MenuItem value="task2">Task 2</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Search"
                    onKeyDown={handleSearchChange}
                />
            </div>
            <ModelsList search={search} taskName={taskName} page={page} />
            <Pagination count={10} page={page} onChange={handlePageChange} />
        </Container>
    )
}

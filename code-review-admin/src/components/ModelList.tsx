"use client"
import type { SelectChangeEvent } from "@mui/material"
import type { KeyboardEventHandler} from "react"

import SearchIcon from "@mui/icons-material/Search"
import { IconButton } from "@mui/material"
import { FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"

import { getModels } from "@/src/actions/models"
import ModelCard from "@/src/components/ModelCard"
import type { Model } from "@/src/utils/models"

export default function ModelsList() {
    const [search, setSearch] = useState("")
    const [taskName, setTaskName] = useState("")
    const [page, setPage] = useState(1)
    const [models, setModels] = useState<Model[]>([])

    const fireSearch = () => {
        getModels(search, taskName, page).then(result => {
            setModels(result.models)
        })
    }

    useEffect(() => {
        fireSearch()
        // eslint-disable-next-line
    }, [])
    const handleSearchChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === "Enter") fireSearch()
    }

    const handleTaskNameChange = (event: SelectChangeEvent) => {
        setTaskName(event.target.value)
    }

    const handlePageChange = (_: unknown, value: number) => {
        setPage(value)
    }
    return (
        <>
            <div className={"flex items-center gap-2"}>
                <FormControl variant={"outlined"} size={"small"}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        variant={"outlined"}
                        value={taskName}
                        label={"Category"}
                        size={"small"}
                        onChange={handleTaskNameChange}
                        style={{ width: "200px" }}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="task1">Task 1</MenuItem>
                        <MenuItem value="task2">Task 2</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Press Enter to search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className={"flex-1"}
                    onKeyUp={handleSearchChange}
                />
                <IconButton onClick={fireSearch}><SearchIcon /></IconButton>
            </div>
            <div
                className={"flex flex-wrap gap-4 py-2 -mx-1 px-1 overflow-y-auto"}
                style={{ height: "calc(100% - 40px - 32px - 8px)"}}
            >
                {models.map((model) => (
                    <ModelCard key={model.id} model={model} onModelTaskSelect={(value) => setTaskName(value)}/>
                ))}
            </div>
            <div className={"py-1 flex justify-end"}>
                <Pagination count={10} page={page} onChange={handlePageChange}/>
            </div>
        </>
    )
}

"use client"
import type { KeyboardEventHandler } from "react"

import SearchIcon from "@mui/icons-material/Search"
import { IconButton, Pagination, TextField } from "@mui/material"
import { useMemo } from "react"
import { useEffect, useState } from "react"

import { getModels } from "@/src/actions/models"
import ModelCard from "@/src/components/ModelCard"
import TaskCategorySelect from "@/src/components/TaskCategorySelect"
import type { Model, PageResultInfo } from "@/src/utils/api"
import { defaultPageResultInfo } from "@/src/utils/api"

export default function ModelsList() {
    const [search, setSearch] = useState("")
    const [taskName, setTaskName] = useState("")
    const [page, setPage] = useState(1)
    const [models, setModels] = useState<Model[]>([])
    const [pageInfo, setPageInfo] = useState<PageResultInfo>(defaultPageResultInfo)

    const pageCount = useMemo(() => Math.ceil(pageInfo.count / pageInfo.per_page), [pageInfo])

    const fireSearch = () => {
        const input = document.querySelector("#search-input") as HTMLInputElement
        if (input) setSearch(input.value)
    }

    const handleSearchChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === "Enter") setSearch((event.target as HTMLInputElement).value)
    }

    const handlePageChange = (_: unknown, value: number) => {
        setPage(value)
    }

    useEffect(() => {
        getModels(search, taskName, page).then(({ models, ...resultInfo }) => {
            setModels(models)
            setPageInfo(resultInfo)
        })
    }, [page, search, taskName])

    return (
        <>
            <div className={"flex items-center gap-2"}>
                <TaskCategorySelect taskName={taskName} onTaskNameSelect={setTaskName}/>
                <TextField
                    id={"search-input"}
                    label="Press Enter to search"
                    className={"flex-1"}
                    onKeyUp={handleSearchChange}
                />
                <IconButton onClick={fireSearch}><SearchIcon/></IconButton>
            </div>
            <div
                className={"py-2 -mx-1 px-1 overflow-y-auto"}
                style={{ height: "calc(100% - 40px - 32px - 8px)" }}
            >
                {models.map((model) => (
                    <div className={"mb-4"} key={model.id}>
                        <ModelCard model={model} onModelTaskSelect={(value) => setTaskName(value)}/>
                    </div>
                ))}
            </div>
            <div className={"py-1 flex justify-end items-center"}>
                total: {pageInfo.count}
                <Pagination count={pageCount} page={pageInfo.page} onChange={handlePageChange}/>
            </div>
        </>
    )
}

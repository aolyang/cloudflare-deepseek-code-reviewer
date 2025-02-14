"use client"
import type { SelectChangeEvent } from "@mui/material"

import { MenuItem } from "@mui/material"
import { FormControl, InputLabel, Select } from "@mui/material"
import { useEffect, useState } from "react"

import { getTasks } from "@/src/actions/tasks"
import type { Task } from "@/src/utils/api"

type TaskCategorySelectProps = {
    taskName: string
    onTaskNameSelect: (taskName: string) => void
}

export default function TaskCategorySelect({ taskName, onTaskNameSelect }: TaskCategorySelectProps) {
    const [ tasks, setTasks ] = useState<Task[]>([])

    useEffect(() => {
        getTasks().then(res => setTasks(res.tasks))
    }, [])
    const handleChange = (event: SelectChangeEvent) => {
        onTaskNameSelect(event.target.value)
    }

    return (
        <FormControl variant={"outlined"} size={"small"}>
            <InputLabel>Category</InputLabel>
            <Select
                variant={"outlined"}
                value={taskName}
                label={"Category"}
                size={"small"}
                onChange={handleChange}
                style={{ width: "200px" }}
            >
                <MenuItem value={""}><em>None</em></MenuItem>
                {tasks.map(task => (
                    <MenuItem key={task.id} value={task.name}>{task.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material"

import TaskCategoryItems from "@/src/components/TaskCategoryItems"

type TaskCategorySelectProps = {
    taskName: string
    onTaskNameSelect: (taskName: string) => void
}

const TaskCategorySelect = ({ taskName, onTaskNameSelect }: TaskCategorySelectProps) => {
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
                <TaskCategoryItems />
            </Select>
        </FormControl>
    )
}

export default TaskCategorySelect

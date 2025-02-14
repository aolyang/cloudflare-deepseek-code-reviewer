import { MenuItem } from "@mui/material"
import { getTasks } from "@/src/actions/tasks"

const TaskCategoryItems = async () => {
    const tasks = await getTasks()

    return (
        <>
            {tasks.map(task => (
                <MenuItem key={task.id} value={task.name}>{task.name}</MenuItem>
            ))}
        </>
    )
}

export default TaskCategoryItems

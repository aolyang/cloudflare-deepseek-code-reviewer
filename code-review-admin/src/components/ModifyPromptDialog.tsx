import type { Prompt } from "@/src/utils/api"

import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField} from "@mui/material"
import { useCallback,useEffect, useMemo, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"

import { getModels } from "@/src/actions/models"
import { createPrompt, updatePrompt } from "@/src/actions/prompts"
import { debounce } from "@/src/utils/debounce"

type ModifyPromptDialogProps = {
    prompt?: Partial<Prompt>
    open: boolean
    onClose: () => void
    onFetch: () => void
}

const defaultValue = (prompt?: Partial<Prompt>) => ({
    name: prompt?.name || "",
    description: prompt?.description || "",
    model: prompt?.model || "",
    messages: prompt?.messages || [{ role: "system", content: "" }]
})

const ModifyPromptDialog = ({
    open, onClose, onFetch, prompt
}: ModifyPromptDialogProps) => {

    const { control, handleSubmit, reset } = useForm({
        defaultValues: defaultValue(prompt)
    })

    // partial prompt "{ name }" can be set in ModelCard
    const isUpdate = useMemo(() => Boolean(prompt?.name), [prompt?.name])

    const { fields, append, remove } = useFieldArray({
        control,
        name: "messages"
    })

    useEffect(() => {
        if (prompt) {
            reset(defaultValue(prompt))
        }
    }, [prompt, reset])

    const onSubmit = async (data: Prompt) => {
        // avoid Non-null assertion operator
        if (isUpdate && prompt?.name) {
            await updatePrompt(prompt.name, data)
        } else {
            await createPrompt(data)
        }
        onFetch()
        onClose()
    }

    const [models, setModels] = useState<string[]>([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchModels = useCallback(debounce((search: string) => {
        getModels(search).then(({ models }) => {
            setModels(models.map(model => model.name))
        })
    }, 300),
    [])

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
            <DialogTitle>{isUpdate ? "Update Prompt" : "Add Prompt"}</DialogTitle>
            <DialogContent>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField{...field} label="Name" fullWidth margin="normal" />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField{...field} label="Description" fullWidth margin="normal" />
                    )}
                />
                <Controller
                    name="model"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            options={models}
                            renderInput={(params) => (
                                <TextField {...params} label="Model" fullWidth margin="normal" onChange={(e) => fetchModels(e.target.value)} />
                            )}
                            onChange={(_, value) => field.onChange(value)}
                        />
                    )}
                />
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                        <Controller
                            name={`messages.${index}.role`}
                            control={control}
                            render={({ field }) => (
                                <FormControl style={{ minWidth: 120 }} margin="normal">
                                    <InputLabel>Role</InputLabel>
                                    <Select{...field}>
                                        <MenuItem value="system">System</MenuItem>
                                        <MenuItem value="user">User</MenuItem>
                                        <MenuItem value="assistant">Assistant</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name={`messages.${index}.content`}
                            control={control}
                            render={({ field }) => (
                                <TextField{...field} label="Content" fullWidth margin="normal" />
                            )}
                        />
                        <IconButton onClick={() => remove(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
                <Button onClick={() => append({ role: "user", content: "" })} startIcon={<AddIcon />}>
                    Add Message
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color={"inherit"}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">
                    {isUpdate ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModifyPromptDialog

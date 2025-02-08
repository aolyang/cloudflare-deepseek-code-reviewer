"use client"

import { createRef } from "react"

import { savePrompt } from "@/actions/save-prompt"

export default function AddPrompt() {
    const textRef = createRef<HTMLTextAreaElement>()
    const keyRef = createRef<HTMLInputElement>()

    const addPrompt = () => {
        const [key, value] = [
            keyRef.current?.value,
            textRef.current?.value
        ]
        if (key && value) savePrompt(key, value)
    }

    return <div className={"flex flex-col gap-4"}>
        <h1>AddPrompt</h1>
        <button onClick={addPrompt}>Add</button>
        <input ref={keyRef} type={"text"} className={"border border-amber-300"}></input>
        <textarea ref={textRef} className={"border border-amber-500"}/>
    </div>
}

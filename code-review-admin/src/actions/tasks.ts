"use server"

export const getTasks = async () => {
    return fetch(`${process.env.API_URL}/api/public/tasks`).then(res => res.json())
}

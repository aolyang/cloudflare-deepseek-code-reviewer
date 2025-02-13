"use server"

export const getPrompts = async () => {
    return fetch(`${process.env.API_URL}/api/prompts`, {
        headers: {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        }
    }).then(res => res.json())
}

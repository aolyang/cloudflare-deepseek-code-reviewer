import { getCloudflareContext } from "@opennextjs/cloudflare"

import AddPrompt from "@/components/AddPrompt"

export default async function Home() {
    const prompts = getCloudflareContext().env.prompts
    const list = await prompts.list()
        .then(res => res.keys.map(k => JSON.stringify(k)))

    return (
        <div className={"flex flex-col justify-center"}>
            <AddPrompt/>
            {list?.map(key => <div key={key}>
                saved prompt: {key}
            </div>)}
        </div>
    )
}

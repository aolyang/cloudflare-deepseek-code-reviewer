import type { GitHubApp } from "../../utils/github"

interface PullRequestPayload {
    repository: {
        owner: {
            login: string
        }
        name: string
    }
    pull_request: {
        number: number
    }
    installation?: {
        id: number
    }
}

const collectGithubPullRequestPatch = async (
    octokit: GitHubApp["octokit"],
    payload: PullRequestPayload
): Promise<string> => {
    const { data: diff } = await (octokit as any).rest.pulls.get({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        pull_number: payload.pull_request.number,
        mediaType: {
            format: "patch"
        }
    })
    console.log("diff", diff)
    return diff
}

export default collectGithubPullRequestPatch

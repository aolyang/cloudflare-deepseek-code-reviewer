import type { GitHubApp } from "../../utils/github"
import type { PayloadIssueCommentCreated } from "./issue_comment.created"

const collectGithubPullRequestPatch = async (
    octokit: GitHubApp["octokit"],
    payload: PayloadIssueCommentCreated
): Promise<string> => {
    const { data: files } = await octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}/files", {
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        pull_number: payload.issue.number,
        headers: {
            "X-GitHub-Api-Version": "2022-11-28"
        }
    })

    return files.map(({ filename, patch }) => `${filename}\n${patch}`).join("\n")
}

export default collectGithubPullRequestPatch

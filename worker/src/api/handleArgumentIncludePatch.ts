import { Octokit } from "@octokit/rest";

const collectGithubPullRequestPatch = async (app: Octokit, payload: any): Promise<string> => {
    const { data } = await app.pulls.get({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        pull_number: payload.issue.number,
        mediaType: {
            format: "diff"
        }
    });

    return data as unknown as string;
};

export default collectGithubPullRequestPatch;

import { Octokit } from 'octokit';

interface DataLoaderOptions {
    token: string | undefined,
    user: string
}

async function dataLoader({ user, token }: DataLoaderOptions) {
    const octokit = new Octokit({
        auth: token ? `token ${token}` : undefined,
        userAgent: `${user}/github.io v1.0.0`,
        log: {
            debug: () => { },
            info: () => { },
            warn: console.warn,
            error: console.error
        },
    });

    const rateLimit = await octokit.rest.rateLimit.get();
    if (!token) {
        console.log(`|  You have ${rateLimit.data.rate.remaining} requests remaining.`);
    }

    // The hardcoded 2 is bad, but we can't determine the amount of requests beforehand.
    if (rateLimit.data.rate.remaining < 2) {
        console.error("!! GitHub API rate limit exceeded.");
        throw new Error("GitHub API rate limit exceeded.");
    }

    const userResponse = await octokit.rest.users.getByUsername({ username: user });

    const repoOptions = octokit.rest.repos.listForUser.endpoint.merge({
        username: user,
        per_page: 100, // 100 is the max allowed value
        type: 'all',
    });
    const repoResponse = await octokit.paginate<any>(repoOptions);

    return {
        user: userResponse.data,
        repos: repoResponse,
        own_repos: repoResponse.filter((x) => x.owner.id === userResponse.data.id),
        contrib_repos: repoResponse.filter((x) => x.owner.id !== userResponse.data.id),
    };
}

export default dataLoader;

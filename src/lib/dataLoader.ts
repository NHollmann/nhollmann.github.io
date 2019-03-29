import Octokit from '@octokit/rest';

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

    const userResponse = await octokit.users.getByUsername({ username: user });

    const repoOptions = octokit.repos.listForUser.endpoint.merge({
        username: user,
        per_page: 100, // 100 is the max. allowed value
        type: 'all',
    });
    const repoResponse = await octokit.paginate(repoOptions);

    return {
        user: userResponse.data,
        repos: repoResponse
    };
}

export default dataLoader;

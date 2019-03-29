import fse from 'fs-extra';

import config from './lib/config';
import pageBuilder from './lib/pageBuilder';
import partialLoader from './lib/partialLoader';
import dataLoader from './lib/dataLoader';

const srcPath = './src';
const distPath = './public';

async function main() {
    console.log();
    console.log("Static site generator");
    console.log("=====================");

    let token: string | undefined = undefined;

    if (process.env.TOKEN) {
        token = process.env.TOKEN;
    } else {
        console.warn("# No GitHub token set! Rate limits may be a problem.");
    }

    console.log("-> Create empty public dir");
    await fse.emptyDir(distPath);

    console.log("-> Copy static assets");
    await fse.copy(`${srcPath}/static`, `${distPath}/`);

    console.log("-> Fetching GitHub API");
    const data = await dataLoader({ token, user: config.user });

    console.log("-> Loading partials");
    const handlebarEnv = await partialLoader({ srcPath });

    console.log("-> Building static pages");
    await pageBuilder({
        config,
        distPath,
        srcPath,
        handlebarEnv,
        data: data,
    });

    console.log("=> Done.");
    console.log();
    console.log("Build succeeded.");
    console.log("=====================");
    console.log();
}

// Async runner
(async () => {
    try {
        await main();
    } catch (e) {
        console.error(e);
    }
})();

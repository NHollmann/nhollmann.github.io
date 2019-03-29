import fse from 'fs-extra';
import path from 'path';
import handlebars from 'handlebars';
import glob from 'glob';

interface LoaderOptions {
    srcPath: string,
}

async function partialLoader({ srcPath } : LoaderOptions) {
    const handlebarEnv = handlebars.create();
    const partials = glob.sync('**/*.html', {cwd: `${srcPath}/partials`});

    const partialPromises = partials.map(async file => {
        console.log(`|  [${file}] Loading partial`);

        const fileSrc = path.resolve(srcPath, 'partials', file);
        const partialName = path.parse(fileSrc).name;
        const fileData = await fse.readFile(fileSrc);

        console.log(`|  [${file}] Activate partial`);
        handlebarEnv.registerPartial(partialName, fileData.toString());
    });

    await Promise.all(partialPromises);

    return handlebarEnv;
}

export default partialLoader;

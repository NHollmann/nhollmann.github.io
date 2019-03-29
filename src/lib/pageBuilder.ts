import fse from 'fs-extra';
import path from 'path';
import handlebars from 'handlebars';
import glob from 'glob';

interface BuilderOptions {
    config: any,
    handlebarEnv: typeof handlebars,
    data: any,
    srcPath: string,
    distPath: string
}

async function pageBuilder({config, handlebarEnv, data, srcPath, distPath} : BuilderOptions) {
    const pages = glob.sync('**/*.html', {cwd: `${srcPath}/pages`});

    const pagePromises = pages.map(async file => {
        console.log(`|  [${file}] Loading template`);

        const fileSrc = path.resolve(srcPath, 'pages', file);
        const fileDest = path.resolve(distPath, file);
        const fileData = await fse.readFile(fileSrc);

        console.log(`|  [${file}] Start building`);
        const fileTemplate = handlebarEnv.compile(fileData.toString());
        const fileOutput = await fileTemplate({config, data});

        console.log(`|  [${file}] Save output`);
        await fse.ensureFile(fileDest);
        await fse.writeFile(fileDest, fileOutput);
    });

    await Promise.all(pagePromises);
}

export default pageBuilder;

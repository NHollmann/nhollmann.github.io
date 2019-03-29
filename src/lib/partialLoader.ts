import fse from 'fs-extra';
import path from 'path';
import handlebars from 'handlebars';
import glob from 'glob';

interface LoaderOptions {
    srcPath: string,
}

function registerHelper(handlebarEnv : typeof handlebars) {
    handlebarEnv.registerHelper({
        eq: function (v1, v2) {
            return v1 === v2;
        },
        ne: function (v1, v2) {
            return v1 !== v2;
        },
        lt: function (v1, v2) {
            return v1 < v2;
        },
        gt: function (v1, v2) {
            return v1 > v2;
        },
        lte: function (v1, v2) {
            return v1 <= v2;
        },
        gte: function (v1, v2) {
            return v1 >= v2;
        },
        and: function () {
            return Array.prototype.slice.call(arguments).every(Boolean);
        },
        or: function () {
            return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
        }
    });
}

async function partialLoader({ srcPath }: LoaderOptions) {
    const handlebarEnv = handlebars.create();
    registerHelper(handlebarEnv);
    
    const partials = glob.sync('**/*.html', { cwd: `${srcPath}/partials` });

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

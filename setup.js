const fs = require('fs');
const os = require('os');



const SEP = os.platform() === 'win32' ? '\\\\' : '/';

// TODO could be dynamic
const DIRS = [
    'code/hello_world',
    'code/server',
    'code/schritte/1-detail',
    'code/schritte/2-hierarchy',
    'code/schritte/3-remote',
    'code/schritte/4-third-party',
    'code/schritte/5-redux',
    'code/experiment/mobx',
    'code/workspace'
];

const processPackageJsonInDirectory = dir => {

    const filename = `${dir}/_package.json`;
    const packageJsonFileName = `${dir}/package.json`;

    console.log(`Processing ${filename} ...`);
    const content = fs.readFileSync(filename, 'UTF-8');
    // console.log(content);

    // path.sep
    const newContent = content.replace(/\.\.\//g, `..${SEP}`)
        .replace(/\/\.bin\//g, `${SEP}.bin${SEP}`)

    fs.writeFileSync(`${packageJsonFileName}`, newContent);
}

DIRS.forEach(processPackageJsonInDirectory);

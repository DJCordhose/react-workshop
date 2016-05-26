const fs = require('fs');
const os = require('os');



const SEP = os.platform() === 'win32' ? '\\\\' : '/';

// TODO could be dynamic
const DIRS = [
    'code/hello_world',
    'code/schritte/1-detail',
    'code/schritte/2-hierarchy',
    'code/schritte/3-tests',
    'code/schritte/4-router',
    'code/schritte/5-remote',
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
        .replace(/\/\.bin\//g, `${SEP}bin${SEP}`)
    
    fs.writeFileSync(`${packageJsonFileName}`, newContent);
}

DIRS.forEach(processPackageJsonInDirectory);

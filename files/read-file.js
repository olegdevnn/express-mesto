const fsPromises = require('fs').promises;

const path = require('path');

export default (pathFile) => fsPromises.readFile(path.join(__dirname, ...pathFile), { encoding: 'utf8' });

const fsPromises = require('fs').promises;
const path = require('path');

module.exports.readFile = (pathFile) => fsPromises.readFile(path.join(__dirname, ...pathFile), { encoding: 'utf8' });

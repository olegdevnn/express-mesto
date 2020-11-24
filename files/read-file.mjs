import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default (pathFile) => fs.promises.readFile(join(__dirname, ...pathFile), 'utf8');

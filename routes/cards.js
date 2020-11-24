import express from 'express';
import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));

router.get('/', (req, res) => {
  const readStream = createReadStream(
    join(__dirname, '..', 'data', 'cards.json'),
  );

  readStream.on('open', () => {
    readStream.pipe(res);
  });

  readStream.on('error', () => {
    res.status(500).send({ message: 'Ошибка сервера' });
  });
});

export default router;

import express from 'express';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import readFile from '../files/read-file';

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
let currentUser = {};

const doesUserExist = (req, res, next) => {
  readFile(['..', 'data', 'users.json'])
    .then(JSON.parse)
    .then((users) => {
      currentUser = users.find((i) => i._id === req.params.id);

      if (!currentUser) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }

      next();
    }).catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const sendUser = (req, res) => {
  res.send(currentUser);
};

router.get('/', (req, res) => {
  const readStream = fs.createReadStream(join(__dirname, '..', 'data', 'users.json'));

  readStream.on('open', () => {
    readStream.pipe(res);
  });

  readStream.on('error', () => {
    res.status(500).send({ message: 'Ошибка сервера' });
  });
});

router.get('/:id', doesUserExist);
router.get('/:id', sendUser);

export default router;

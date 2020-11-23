import readFile from '../files/read-file.js';

const router = require('express').Router();

router.get('/', (req, res) => {
  // подготовка к запросам бд
  readFile(['..', 'data', 'cards.json'])
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
});

export default router;

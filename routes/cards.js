const router = require('express').Router();
const { readFile } = require('../files/read-file');

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

module.exports = router;

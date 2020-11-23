const router = require('express').Router();
const { readFile } = require('../files/read-file');

router.get('/:id', (req, res) => {
  // подготовка к запросам бд
  readFile(['..', 'data', 'users.json'])
    .then(JSON.parse)
    .then((users) => {
      const user = users.filter((i) => i._id === req.params.id);

      if (user.length === 0) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.send(user);
      }
    }).catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
});

router.get('/', (req, res) => {
  // подготовка к запросам бд
  readFile(['..', 'data', 'users.json'])
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
});

module.exports = router;

import routerUsers from './routes/users.js';
import routerCards from './routes/cards.js';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', routerCards);
app.use('/users', routerUsers);
app.use((req, res) => {
  res.status(404).send({ message: 'Данный метод не поддерживается' });
});

app.listen(PORT);

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log('Ошибка подключения к mongodb');
  }
})();

app.use((req, res, next) => {
  req.user = {
    _id: '5fcec0ec8eb76558685c50d6',
  };

  next();
});

app.use(
  express.static(join(dirname(fileURLToPath(import.meta.url)), 'public'))
);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);

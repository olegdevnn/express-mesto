import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
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
    _id: '5fcf87d08c13a26698380afa',
  };

  next();
});

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);

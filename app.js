import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import {ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_SERVER_ERROR,} from './units/errorsCode';

const {PORT = 3000} = process.env;
const app = express();

const handleErrors = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(ERROR_BAD_REQUEST).send({message: `Переданы некорректные данные, параметр '${err.path}'`});
  } else if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el) => el.message);
    res.status(ERROR_BAD_REQUEST).send({message: `${errors.join(', ')}`});
  } else if (err.status === ERROR_NOT_FOUND) {
    res.status(ERROR_NOT_FOUND).send({message: err.message});
  } else if (err || err.status === ERROR_SERVER_ERROR) {
    res.status(ERROR_SERVER_ERROR).send({message: 'Произошла ошибка'});
  } else {
    next();
  }
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).catch(() => {
  console.log('Ошибка подключения к mongodb');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((err, req, res, next) => {
  if (err) {
    res.status(ERROR_BAD_REQUEST).send({message: 'Не верный формат данных json'});
  } else {
    next();
  }
});

// TODO: Для работы сервиса, нужно создать пользователя с _id
//  Без него не будет работать /users/my, /users/my/avatar
app.use((req, res, next) => {
  req.user = {
    _id: '5fcec0ec8eb76558685c50d6',
  };

  next();
});

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use(handleErrors);

app.use((req, res) => {
  res
    .status(ERROR_NOT_FOUND)
    .send({message: 'Запрашиваемый ресурс не найден'});
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

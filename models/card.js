import mongoose from 'mongoose';
import validatorUrl from '../units/validators';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле \'name\' обязательное для заполнения'],
    minlength: [2, 'Поле \'name\' должно быть минимум 2 знака'],
    maxlength: [30, 'Поле \'name\' должно быть не более 30 знаков'],
  },
  link: {
    type: String,
    required: [true, 'Поле \'link\' обязательное для заполнения'],
    validate: {
      validator: validatorUrl,
      message: 'В поле \'link\' не указан верный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('card', cardSchema);

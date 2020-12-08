import mongoose from 'mongoose';
import { validatorUrl } from '../units/validators';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Поле ссылка обязательное для заполнения'],
    validate: {
      validator: validatorUrl,
      message: 'Указан не верный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('card', cardSchema);

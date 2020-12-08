import mongoose from 'mongoose';
import validatorUrl from '../units/validators';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле \'name\' обязательное для заполнения'],
    minlength: [2, 'Поле \'name\' должно быть минимум 2 знака'],
    maxlength: [30, 'Поле \'name\' должно быть не более 30 знаков'],
  },
  about: {
    type: String,
    required: [true, 'Поле \'avatar\' обязательное для заполнения'],
    minlength: [2, 'Поле \'avatar\' должно быть минимум 2 знака'],
    maxlength: [30, 'Поле \'avatar\' должно быть не более 30 знаков'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле \'avatar\' обязательное для заполнения'],
    validate: {
      validator: validatorUrl,
      message: 'В поле \'avatar\' не указан верный URL',
    },
  },
});
export default mongoose.model('user', userSchema);

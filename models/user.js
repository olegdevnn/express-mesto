import mongoose from 'mongoose';
import validatorUrl from '../units/validators';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Поле ссылка обязательное для заполнения'],
    validate: {
      validator: validatorUrl,
      message: 'Указан не верный URL',
    },
  },
});
export default mongoose.model('user', userSchema);

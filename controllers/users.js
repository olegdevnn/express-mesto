import User from '../models/user';
import {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL_SERVER_ERROR,
  ERROR_CODE_RESOURCE_NOT_FOUND,
} from '../units/errorsCode';

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('cards').exec();
    return res.send({ data: users });
  } catch (err) {
    return res
      .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    return res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE_BAD_REQUEST).send({ message: err.message });
    }
    return res
      .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    if (!user) {
      return res
        .status(ERROR_CODE_RESOURCE_NOT_FOUND)
        .send({ message: 'Нет пользователя с таким id' });
    }
    return res.send({ data: user });
  } catch (err) {
    return res
      .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' });
  }
};

const editUser = async (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { name, about },
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    if (!user) {
      return res
        .status(ERROR_CODE_RESOURCE_NOT_FOUND)
        .send({ message: 'Нет пользователя с таким id' });
    }
    return res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE_BAD_REQUEST).send({ message: err.message });
    }
    return res
      .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' });
  }
};

const editAvatarUser = async (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    if (!user) {
      return res
        .status(ERROR_CODE_RESOURCE_NOT_FOUND)
        .send({ message: 'Нет пользователя с таким id' });
    }
    return res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE_BAD_REQUEST).send({ message: err.message });
    }
    return res
      .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' });
  }
};

export { getUsers, createUser, getUser, editUser, editAvatarUser };

import User from '../models/user';
import { ERROR_NOT_FOUND } from '../units/errorsCode';

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('cards').exec();
    return res.send({ data: users });
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      const err = new Error('Нет пользователя с таким id');
      err.status = 404;
      return next(err);
    }
    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

const editUser = async (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    if (!user) {
      const err = new Error('Нет пользователя с таким id');
      err.status = ERROR_NOT_FOUND;
      return next(err);
    }
    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

const editAvatarUser = async (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    if (!user) {
      const err = new Error('Нет пользователя с таким id');
      err.status = ERROR_NOT_FOUND;
      return next(err);
    }
    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

export {
  getUsers, createUser, getUser, editUser, editAvatarUser,
};

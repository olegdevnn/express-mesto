import Card from '../models/card';
import {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL_SERVER_ERROR,
  ERROR_CODE_RESOURCE_NOT_FOUND,
} from '../units/errorsCode';

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('likes').exec();
    return res.send({ data: cards });
  } catch (err) {
    return res
      .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const { user } = req;
  try {
    const card = await Card.create({
      name,
      link,
      owner: user._id,
    });
    return res.send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.message &&
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: err.message });
      return res
        .status(ERROR_CODE_BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные' });
    }
    return res
      .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' });
  }
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id, {
    new: true,
  }).then((card) =>
    res
      .send({ data: card })
      .catch((err) =>
        res
          .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла ошибка' })
      )
  );
};

const addLikeCard = async (req, res) => {
  const { user } = req;

  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: user._id } },
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    if (!card) {
      return res
        .status(ERROR_CODE_RESOURCE_NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    return res.send({ data: card });
  } catch (err) {
    return res
      .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' });
  }
};

const deleteLikeCard = async (req, res) => {
  const { user } = req;

  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: user._id } },
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    if (!card) {
      return res
        .status(ERROR_CODE_RESOURCE_NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    return res.send({ data: card });
  } catch (err) {
    return res
      .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' });
  }
};

export { getCards, createCard, deleteCard, addLikeCard, deleteLikeCard };

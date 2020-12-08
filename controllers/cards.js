import Card from '../models/card';
import { ERROR_NOT_FOUND } from '../units/errorsCode';

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('likes').exec();
    return res.send({ data: cards });
  } catch (err) {
    return next(err);
  }
};

const createCard = async (req, res, next) => {
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
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      const err = new Error('Карточка не найдена');
      err.status = ERROR_NOT_FOUND;
      return next(err);
    }
    return res.send({ data: card });
  } catch (err) {
    return next(err);
  }
};

const addLikeCard = async (req, res, next) => {
  const { user } = req;
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: user._id } },
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    if (!card) {
      const err = new Error('Карточка не найдена');
      err.status = ERROR_NOT_FOUND;
      return next(err);
    }
    return res.send({ data: card });
  } catch (err) {
    return next(err);
  }
};

const deleteLikeCard = async (req, res, next) => {
  const { user } = req;
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: user._id } },
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    if (!card) {
      const err = new Error('Карточка не найдена');
      err.status = ERROR_NOT_FOUND;
      return next(err);
    }
    return res.send({ data: card });
  } catch (err) {
    return next(err);
  }
};

export {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
};

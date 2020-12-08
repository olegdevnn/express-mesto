import express from 'express';
import {
  addLikeCard,
  createCard,
  deleteCard,
  deleteLikeCard,
  getCards,
} from '../controllers/cards';

const router = express.Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', addLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

export default router;

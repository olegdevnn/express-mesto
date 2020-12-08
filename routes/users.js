import express from 'express';
import {
  createUser,
  editAvatarUser,
  editUser,
  getUser,
  getUsers,
} from '../controllers/users';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatarUser);

export default router;

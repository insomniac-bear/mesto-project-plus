import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserAvatar,
  updateUserProfile,
} from '../controllers/user';

export const router = Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

export default router;

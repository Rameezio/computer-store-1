import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  updateUserRole,
  deleteUser,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getAllUsers);
router.get('/:id', protect, adminOnly, getUser);
router.put('/:id', protect, adminOnly, updateUser);
router.patch('/:id/role', protect, adminOnly, updateUserRole);
router.delete('/:id', protect, adminOnly, deleteUser);

export default router;

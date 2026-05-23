import express from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  getAdminStats,
  getRecentOrders,
} from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/', protect, adminOnly, getAllOrders);
router.get('/:id', protect, getOrder);
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

// Admin stats (matches existing adminAPI.js calls)
router.get('/admin/stats', protect, adminOnly, getAdminStats);
router.get('/admin/recent-orders', protect, adminOnly, getRecentOrders);

export default router;

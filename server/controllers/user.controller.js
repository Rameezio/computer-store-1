import User from '../models/User.model.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @GET /api/users — admin only
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await User.countDocuments();
  const users = await User.find().sort('-createdAt').skip(skip).limit(Number(limit));
  res.json({ success: true, data: users, total });
});

// @GET /api/users/:id — admin only
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ success: true, user });
});

// @PUT /api/users/:id — admin only
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, phone, role },
    { new: true, runValidators: true }
  );
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ success: true, user });
});

// @PATCH /api/users/:id/role — admin only
export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) {
    res.status(400);
    throw new Error('Invalid role');
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ success: true, user });
});

// @DELETE /api/users/:id — admin only
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ success: true, message: 'User deleted successfully' });
});

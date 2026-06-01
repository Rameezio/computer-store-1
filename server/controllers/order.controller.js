import Order from '../models/Order.model.js';
import Product from '../models/Product.model.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @POST /api/orders — public (guest allowed)
export const createOrder = asyncHandler(async (req, res) => {
  const { customerInfo, items, totalAmount } = req.body;

  if (!customerInfo || !items?.length) {
    res.status(400);
    throw new Error('Missing required order fields');
  }

  // Verify prices from DB — never trust client-side prices
  let calculatedTotal = 0;
  const verifiedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        throw new Error(`Product "${item.name}" is no longer available`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for "${product.name}"`);
      }
      calculatedTotal += product.price * item.quantity;
      return {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: item.quantity,
      };
    })
  );

  const order = await Order.create({
    user: req.user?._id || null,
    customerInfo,
    items: verifiedItems,
    totalAmount: calculatedTotal,
  });

  // Decrement stock
  await Promise.all(
    verifiedItems.map((item) =>
      Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity, soldCount: item.quantity },
      })
    )
  );

  await order.populate('items.product', 'name images');

  res.status(201).json({ success: true, order });
});

// @GET /api/orders/my — logged-in user
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort('-createdAt')
    .populate('items.product', 'name images');
  res.json({ success: true, orders });
});

// @GET /api/orders — admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = status ? { status } : {};
  const skip = (Number(page) - 1) * Number(limit);
  const total = await Order.countDocuments(filter);
  const orders = await Order.find(filter)
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit))
    .populate('user', 'name email');

  res.json({ success: true, orders, total });
});

// @GET /api/orders/:id — admin or order owner
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('items.product', 'name images');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const isOwner = order.user?._id?.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    res.status(403);
    throw new Error('Access denied');
  }

  res.json({ success: true, order });
});

// @PUT /api/orders/:id/status — admin only
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
  if (!allowed.includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status,
      $push: { statusHistory: { status, changedBy: req.user._id } },
    },
    { new: true }
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json({ success: true, order });
});

// @DELETE /api/orders/:id — admin only
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json({ success: true, message: 'Order deleted successfully' });
});

// @GET /api/admin/stats — admin
export const getAdminStats = asyncHandler(async (req, res) => {
  const [totalOrders, totalUsers, revenue, pendingOrders, totalProducts] = await Promise.all([
    Order.countDocuments(),
    (await import('../models/User.model.js')).default.countDocuments(),
    Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
    Order.countDocuments({ status: 'Pending' }),
    Product.countDocuments({ isActive: true }),
  ]);

  res.json({
    success: true,
    data: {
      totalOrders,
      totalUsers,
      totalRevenue: revenue[0]?.total || 0,
      pendingOrders,
      totalProducts,
    },
  });
});

// @GET /api/admin/recent-orders — admin
export const getRecentOrders = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 5;
  const orders = await Order.find()
    .sort('-createdAt')
    .limit(limit)
    .populate('user', 'name email');

  res.json({ success: true, data: orders });
});

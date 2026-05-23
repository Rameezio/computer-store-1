import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    customerInfo: {
      fullName: { type: String, required: [true, 'Full name is required'] },
      phone: {
        type: String,
        required: [true, 'Phone is required'],
        match: [/^(\+92|0)?[3][0-9]{9}$/, 'Enter a valid Pakistani phone number'],
      },
      city: { type: String, required: [true, 'City is required'] },
      address: { type: String, required: [true, 'Address is required'] },
      notes: { type: String, default: '' },
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (arr) => arr.length >= 1,
        message: 'Order must have at least one item',
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['COD'],
      default: 'COD',
    },
    statusHistory: [
      {
        status: String,
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);

orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `TG-${date}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);

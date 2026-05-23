import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.model.js';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const existing = await User.findOne({ email: 'electrob124@gmail.com' }).select('+password');

if (existing) {
  existing.role = 'admin';
  existing.password = 'm.h.i2026';
  await existing.save();
  console.log('Existing account updated to admin with new password.');
} else {
  await User.create({
    name: 'Admin',
    email: 'electrob124@gmail.com',
    password: 'm.h.i2026',
    phone: '03041109928',
    role: 'admin',
  });
  console.log('New admin account created.');
}

console.log('   Email:    electrob124@gmail.com');
console.log('   Password: m.h.i2026');

await mongoose.disconnect();
process.exit(0);

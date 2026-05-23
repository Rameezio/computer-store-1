import React from 'react';
import { Package, ShoppingCart, FileText, Users } from 'lucide-react';

const EmptyState = ({ type = 'default', message, actionText, onAction }) => {
  const icons = {
    default: Package,
    cart: ShoppingCart,
    orders: FileText,
    users: Users
  };

  const Icon = icons[type] || Package;

  const defaultMessages = {
    default: 'No data found',
    cart: 'Your cart is empty',
    orders: 'No orders yet',
    users: 'No users found'
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-[#0c1222]/50 border border-white/10 flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-500" />
      </div>
      <p className="text-gray-400 text-lg font-medium mb-2">{message || defaultMessages[type]}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-6 py-2 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

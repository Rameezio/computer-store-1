import React, { useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Home, ShoppingBag, MessageCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../config/whatsapp';

const OrderSuccess = () => {
  const location = useLocation();
  const { order, customerInfo, total, waURL } = location.state || {};

  if (!order && !customerInfo) {
    return <Navigate to="/" replace />;
  }

  // Auto-open WhatsApp to admin number when order is placed
  useEffect(() => {
    if (waURL) {
      const timer = setTimeout(() => {
        window.open(waURL, '_blank');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [waURL]);

  const handleWhatsApp = () => {
    if (waURL) {
      window.open(waURL, '_blank');
    }
  };

  return (
    <div className="bg-[#050810] min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-[#25D366]/10 border-2 border-[#25D366]/40 flex items-center justify-center shadow-[0_0_40px_rgba(37,211,102,0.2)]">
              <CheckCircle2 className="w-12 h-12 text-[#25D366]" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">ORDER PLACED!</h1>
            <p className="text-gray-400 text-sm mb-8">
              Your order has been received. We'll confirm via WhatsApp shortly.
            </p>
          </motion.div>

          {/* Order Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0c1222]/50 border border-white/5 rounded-xl p-6 mb-6 text-left"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
              <Package className="w-5 h-5 text-primary" />
              <div>
                <p className="text-white font-bold text-sm">
                  {order?.orderNumber || 'Order Confirmed'}
                </p>
                <p className="text-gray-500 text-xs">Cash on Delivery</p>
              </div>
              <span className="ml-auto px-2 py-1 rounded text-[10px] font-bold uppercase bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                Pending
              </span>
            </div>

            {order?.customerInfo ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="text-white font-medium">{order.customerInfo.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-white font-medium">{order.customerInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">City</span>
                  <span className="text-white font-medium">{order.customerInfo.city}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-white font-bold">
                    Rs. {order.totalAmount?.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              customerInfo && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name</span>
                    <span className="text-white font-medium">{customerInfo.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone</span>
                    <span className="text-white font-medium">{customerInfo.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">City</span>
                    <span className="text-white font-medium">{customerInfo.city}</span>
                  </div>
                  {total && (
                    <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-white font-bold">Rs. {total?.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )
            )}
          </motion.div>

          {/* WhatsApp CTA */}
          {waURL && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-3"
            >
              <p className="text-[#25D366] text-xs mb-2 text-center">Opening WhatsApp to send your order to admin...</p>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                RESEND ON WHATSAPP
              </button>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3"
          >
            <Link
              to="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white font-bold rounded-xl transition-all text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              My Orders
            </Link>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white font-bold rounded-xl transition-all text-sm"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;

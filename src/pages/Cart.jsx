import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Truck, RotateCcw, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import WhyChooseUs from '../components/WhyChooseUs';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, total, itemCount } = useCart();

  const formatPrice = (price) => Number(price).toLocaleString('en-PK');

  return (
    <div className="bg-[#f8f9fe] min-h-screen pb-12 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <div className="text-gray-500 text-xs flex items-center gap-2 mb-4 font-medium">
          <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-[#0f172a] font-bold">Cart</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight mb-8">
          Your Cart <span className="text-[#00d4ff] text-xl sm:text-2xl font-bold">({itemCount} Items)</span>
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-[#0f172a] mb-2">Your cart is empty</h2>
            <p className="text-gray-600 text-sm mb-6">Add some products to get started</p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] hover:from-[#00b8e6] hover:to-[#2563eb] text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(0,212,255,0.3)] transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 mb-16">

            {/* Left: Cart Items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">

                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                  <div className="col-span-5">PRODUCT</div>
                  <div className="col-span-2 text-center">PRICE</div>
                  <div className="col-span-2 text-center">QUANTITY</div>
                  <div className="col-span-2 text-center">TOTAL</div>
                  <div className="col-span-1 text-center">ACTION</div>
                </div>

                {/* Cart Items */}
                <div className="flex flex-col">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors"
                      >
                        {/* Product Info */}
                        <div className="col-span-1 sm:col-span-5 flex items-center gap-4">
                          <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 flex items-center justify-center flex-shrink-0 border border-gray-100">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <div>
                            <h3 className="text-[#0f172a] font-black text-sm leading-tight mb-1">{item.name}</h3>
                            <p className="text-gray-500 text-[10px] font-bold mb-1 uppercase tracking-wider">{item.category}</p>
                            <div className="flex items-center gap-1 mt-1 text-[#25D366]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span className="text-[10px] font-bold">In Stock</span>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                          <span className="sm:hidden text-gray-500 text-[10px] font-bold uppercase tracking-widest">Price:</span>
                          <span className="text-[#0f172a] font-bold text-sm">Rs. {formatPrice(item.price)}</span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                          <span className="sm:hidden text-gray-500 text-[10px] font-bold uppercase tracking-widest">Quantity:</span>
                          <div className="flex items-center bg-gray-50 border border-gray-200 rounded overflow-hidden shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#0f172a] hover:bg-gray-200 transition-colors"
                            >-</button>
                            <span className="w-8 h-8 flex items-center justify-center bg-white text-[#0f172a] text-xs font-bold border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#0f172a] hover:bg-gray-200 transition-colors"
                            >+</button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                          <span className="sm:hidden text-gray-500 text-[10px] font-bold uppercase tracking-widest">Total:</span>
                          <span className="text-[#0f172a] font-bold text-sm">Rs. {formatPrice(item.price * item.quantity)}</span>
                        </div>

                        {/* Remove */}
                        <div className="col-span-1 sm:col-span-1 flex justify-end sm:justify-center items-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Table Footer */}
                <div className="p-4 flex items-center justify-between">
                  <Link to="/shop" className="flex items-center gap-2 text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-[#0f172a] hover:bg-gray-50 rounded-lg px-4 py-2 transition-all shadow-sm group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold">Continue Shopping</span>
                  </Link>
                  <button onClick={clearCart} className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    <span className="text-xs font-bold">Clear Cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full lg:w-1/3 space-y-4">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h2 className="text-[#0f172a] font-black tracking-widest uppercase text-sm mb-6">ORDER SUMMARY</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Subtotal ({itemCount} Items)</span>
                    <span className="text-[#0f172a] font-bold">Rs. {formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-600 font-medium">Shipping</span>
                      <Info className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-[#25D366] font-bold">FREE</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="text-[#0f172a] font-black text-lg">Total Amount</span>
                    <span className="text-3xl font-black text-[#0f172a] tracking-tight">
                      Rs. {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] hover:from-[#00b8e6] hover:to-[#2563eb] text-white font-bold py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(0,212,255,0.3)] flex items-center justify-center gap-2"
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trust Features */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-5 shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <ShieldCheck className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="text-[#0f172a] text-sm font-bold mb-0.5">100% Original Products</h4>
                    <p className="text-gray-500 text-xs font-medium">Sourced from trusted brands only</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <Truck className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h4 className="text-[#0f172a] text-sm font-bold mb-0.5">Fast Delivery</h4>
                    <p className="text-gray-500 text-xs font-medium">1-3 Days All Over Pakistan</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <RotateCcw className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="text-[#0f172a] text-sm font-bold mb-0.5">7 Days Return</h4>
                    <p className="text-gray-500 text-xs font-medium">Hassle free return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <WhyChooseUs />
    </div>
  );
};

export default Cart;

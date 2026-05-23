import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { WHATSAPP_CONFIG } from '../config/whatsapp';
import { CITIES, DELIVERY_FEE } from '../config/constants';
import { ordersAPI } from '../services/orders';
import { ArrowLeft, Truck, ShieldCheck, RotateCcw, Headphones as HeadphonesIcon } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    phoneNumber: user?.phone || '',
    address: '',
    city: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      addToast('Your cart is empty', 'error');
      navigate('/shop');
      return;
    }

    if (!formData.customerName || !formData.phoneNumber || !formData.address || !formData.city) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);

    try {
      // Build payload for backend — server re-verifies prices
      const orderPayload = {
        customerInfo: {
          fullName: formData.customerName,
          phone: formData.phoneNumber,
          city: formData.city,
          address: formData.address,
          notes: formData.notes,
        },
        items: cart.map((item) => ({
          product: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        paymentMethod: 'COD',
      };

      // Try real API first; fall back to WhatsApp-only flow if backend is offline
      let order = null;
      try {
        const res = await ordersAPI.create(orderPayload);
        order = res.order;
      } catch {
        // Backend offline — continue with WhatsApp-only
      }

      // Build WhatsApp URL (works with or without backend)
      const waOrderData = {
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        notes: formData.notes,
        items: cart,
        subtotal,
        deliveryFee,
        total,
      };
      const waMessage = WHATSAPP_CONFIG.generateOrderMessage(waOrderData);
      const waURL = `https://wa.me/${WHATSAPP_CONFIG.ADMIN_NUMBER}?text=${waMessage}`;

      clearCart();
      addToast('Order placed! Redirecting...', 'success');

      navigate('/order-success', {
        state: {
          order,
          customerInfo: formData,
          total,
          waURL,
        },
      });
    } catch (error) {
      addToast('Failed to place order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#f8f9fe] min-h-screen pb-12 pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Your cart is empty</h2>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] hover:from-[#00b8e6] hover:to-[#2563eb] text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(0,212,255,0.3)] transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fe] min-h-screen pb-12 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-gray-500 text-xs flex items-center gap-2 mb-8 font-medium">
          <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <Link to="/cart" className="hover:text-[#00d4ff] transition-colors">Cart</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-[#0f172a] font-bold">Checkout</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight mb-8">
          CHECKOUT
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Checkout Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 space-y-6 shadow-sm">
              
              {/* Contact Information */}
              <div>
                <h2 className="text-[#0f172a] font-bold tracking-widest uppercase text-sm mb-4">
                  CONTACT INFORMATION
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-colors"
                      placeholder="03XXXXXXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-[#0f172a] font-bold tracking-widest uppercase text-sm mb-4">
                  SHIPPING ADDRESS
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">
                      City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-colors"
                    >
                      <option value="">Select City</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-colors resize-none"
                      placeholder="House/Flat #, Street, Area, Landmark"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h2 className="text-[#0f172a] font-bold tracking-widest uppercase text-sm mb-4">
                  ADDITIONAL NOTES (OPTIONAL)
                </h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-colors resize-none"
                  placeholder="Any special instructions for your order"
                />
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-[#0f172a] font-bold tracking-widest uppercase text-sm mb-4">
                  PAYMENT METHOD
                </h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-[#00d4ff] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00d4ff]" />
                    </div>
                    <div>
                      <p className="text-[#0f172a] font-bold text-sm">Cash on Delivery</p>
                      <p className="text-gray-500 text-xs">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] hover:from-[#00b8e6] hover:to-[#2563eb] text-white font-bold py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(0,212,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'PLACE ORDER VIA WHATSAPP'}
              </button>

            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-[#0f172a] font-black tracking-widest uppercase text-sm mb-6">
                ORDER SUMMARY
              </h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex-shrink-0 flex items-center justify-center border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#0f172a] text-xs font-bold line-clamp-1 mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-[10px] font-bold mb-1">Qty: {item.quantity}</p>
                      <p className="text-[#0f172a] text-xs font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Subtotal ({cart.length} items)</span>
                  <span className="text-[#0f172a] font-bold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Delivery</span>
                  <span className="text-[#25D366] font-bold">{deliveryFee === 0 ? 'FREE' : 'Rs. ' + deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[#0f172a] font-black text-lg">Total</span>
                    <span className="text-2xl font-black text-[#0f172a] tracking-tight">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Features */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="space-y-5">
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
                    <h4 className="text-[#0f172a] text-sm font-bold mb-0.5">Cash on Delivery</h4>
                    <p className="text-gray-500 text-xs font-medium">Pay when you receive your order</p>
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
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <HeadphonesIcon className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="text-[#0f172a] text-sm font-bold mb-0.5">24/7 Support</h4>
                    <p className="text-gray-500 text-xs font-medium">We're here to help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

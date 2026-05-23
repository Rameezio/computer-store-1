import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { ordersAPI } from '../services/orders';
import { ORDER_STATUS, ORDER_STATUS_COLORS } from '../config/constants';
import { Package, User, MapPin, Phone, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();

  // Redirect admin to admin panel
  if (isAdmin) return <Navigate to="/admin/dashboard" replace />;
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getUserOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      // Use mock data if API fails
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-[#f8f9fe] min-h-screen pb-12 pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Loader size="lg" text="Loading your orders..." />
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
          <span className="text-[#0f172a] font-bold">My Account</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: User Info */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-[0_4px_10px_rgba(0,212,255,0.2)]">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-[#0f172a] font-black text-lg">{user?.name || 'User'}</h2>
                  <p className="text-gray-500 text-sm font-medium">{user?.email || ''}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{user?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Pakistan</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Member since {new Date().getFullYear()}</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full mt-6 py-3 border border-red-200 text-red-500 font-bold rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-[#0f172a] font-black tracking-widest uppercase text-sm mb-4">
                QUICK LINKS
              </h3>
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#00d4ff]/10 text-[#0099cc] border border-[#00d4ff]/20"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-bold">My Orders</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop"
                  className="flex items-center justify-between p-3 rounded-lg text-gray-600 hover:text-[#0f172a] hover:bg-gray-50 transition-colors font-medium border border-transparent"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    <span>Shop Now</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center justify-between p-3 rounded-lg text-gray-600 hover:text-[#0f172a] hover:bg-gray-50 transition-colors font-medium border border-transparent"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    <span>My Cart</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Orders */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mb-6">
              MY ORDERS
            </h1>

            {orders.length === 0 ? (
              <EmptyState
                type="orders"
                message="You haven't placed any orders yet"
                actionText="Start Shopping"
                onAction={() => window.location.href = '/shop'}
              />
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#0f172a] font-bold">Order #{order.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${ORDER_STATUS_COLORS[order.status] || ORDER_STATUS_COLORS.pending}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs font-medium">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#0f172a] font-bold text-lg">Rs. {order.total?.toLocaleString() || '0'}</p>
                        <p className="text-gray-500 text-xs font-medium">{order.items?.length || 0} items</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg p-2 flex-shrink-0 flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[#0f172a] text-xs font-bold line-clamp-1">{item.name}</h4>
                            <p className="text-gray-500 text-[10px] font-medium">Qty: {item.quantity} × Rs. {item.price?.toLocaleString() || '0'}</p>
                          </div>
                          <p className="text-[#0f172a] text-xs font-bold">Rs. {(item.quantity * item.price)?.toLocaleString() || '0'}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="text-gray-600 text-xs font-medium">
                        <p>Payment: Cash on Delivery</p>
                        <p>Delivery: {order.address || 'N/A'}</p>
                      </div>
                      <Link
                        to={`/order/${order.id}`}
                        className="text-[#00d4ff] hover:text-[#00b8e6] text-xs font-bold hover:underline flex items-center gap-1 transition-colors"
                      >
                        View Details
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

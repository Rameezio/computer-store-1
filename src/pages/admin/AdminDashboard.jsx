import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/admin';
import StatCard from '../../components/StatCard';
import Loader from '../../components/Loader';
import {
  ShoppingCart, Package, Users, TrendingUp,
  ArrowRight, Clock, CheckCircle, Truck, XCircle, Plus
} from 'lucide-react';

const STATUS_CONFIG = [
  { key: 'Pending',   label: 'Pending',   color: 'bg-yellow-500', text: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  { key: 'Confirmed', label: 'Confirmed', color: 'bg-blue-500',   text: 'text-blue-600',   bg: 'bg-blue-50 border-blue-200' },
  { key: 'Shipped',   label: 'Shipped',   color: 'bg-purple-500', text: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
  { key: 'Delivered', label: 'Delivered', color: 'bg-green-500',  text: 'text-green-600',  bg: 'bg-green-50 border-green-200' },
  { key: 'Cancelled', label: 'Cancelled', color: 'bg-red-500',    text: 'text-red-600',    bg: 'bg-red-50 border-red-200' },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getRecentOrders(8),
      ]);
      setStats(statsRes.data || {});
      setRecentOrders(ordersRes.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n) => Number(n || 0).toLocaleString('en-PK');
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });

  if (loading) return <div className="flex justify-center py-24"><Loader size="lg" text="Loading dashboard..." /></div>;

  const totalOrders = stats?.totalOrders || 0;

  // Build status breakdown from recentOrders (approximation) — real counts come from stats
  const statusCounts = {
    Pending:   stats?.pendingOrders || 0,
    Confirmed: 0,
    Shipped:   0,
    Delivered: 0,
    Cancelled: 0,
  };
  recentOrders.forEach(o => {
    if (o.status in statusCounts && o.status !== 'Pending') statusCounts[o.status]++;
  });

  return (
    <div className="space-y-8">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders"    value={fmt(stats?.totalOrders)}   icon={ShoppingCart} color="blue"   />
        <StatCard title="Total Revenue"   value={`Rs. ${fmt(stats?.totalRevenue)}`} icon={TrendingUp} color="green" />
        <StatCard title="Pending Orders"  value={fmt(stats?.pendingOrders)} icon={Clock}        color="orange" />
        <StatCard title="Total Users"     value={fmt(stats?.totalUsers)}    icon={Users}        color="purple" />
      </div>

      {/* ── Orders Status Overview ── */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#0f172a] font-black text-sm uppercase tracking-widest">Orders Overview</h2>
          <Link to="/admin/orders" className="flex items-center gap-1 text-[#00d4ff] text-xs font-bold hover:underline">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {STATUS_CONFIG.map(s => (
            <Link
              key={s.key}
              to={`/admin/orders`}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border ${s.bg} hover:scale-105 transition-transform shadow-sm`}
            >
              <span className={`text-2xl font-black ${s.text}`}>{statusCounts[s.key]}</span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1">{s.label}</span>
            </Link>
          ))}
        </div>

        {/* Progress Bar */}
        {totalOrders > 0 && (
          <div className="flex h-2 rounded-full overflow-hidden gap-0.5 bg-gray-100">
            {STATUS_CONFIG.map(s => {
              const pct = totalOrders > 0 ? (statusCounts[s.key] / totalOrders) * 100 : 0;
              return pct > 0 ? (
                <div key={s.key} className={`${s.color} transition-all`} style={{ width: `${pct}%` }} title={`${s.label}: ${statusCounts[s.key]}`} />
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* ── Recent Orders Table ── */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[#0f172a] font-black text-sm uppercase tracking-widest">Recent Orders</h2>
          <Link to="/admin/orders" className="flex items-center gap-1 text-[#00d4ff] text-xs font-bold hover:underline">
            Manage Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <ShoppingCart className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">No orders have been received yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-100 bg-gray-50">
                  <th className="pb-3 pl-6 pt-3">Order #</th>
                  <th className="pb-3 pt-3">Customer</th>
                  <th className="pb-3 pt-3">Amount</th>
                  <th className="pb-3 pt-3">Status</th>
                  <th className="pb-3 pr-6 pt-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => {
                  const sc = STATUS_CONFIG.find(s => s.key === order.status);
                  return (
                    <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pl-6 text-[#0f172a] font-bold text-xs">{order.orderNumber}</td>
                      <td className="py-3">
                        <p className="text-[#0f172a] font-bold text-xs">{order.customerInfo?.fullName || order.user?.name || '—'}</p>
                        <p className="text-gray-500 text-[10px]">{order.customerInfo?.city}</p>
                      </td>
                      <td className="py-3 text-[#0f172a] font-bold text-xs">Rs. {fmt(order.totalAmount)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${sc?.bg || 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 pr-6 text-gray-500 text-xs">{fmtDate(order.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Add Product Shortcut */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0f172a] font-black text-sm uppercase tracking-widest">Products</h3>
            <span className="text-gray-500 text-xs font-bold">{fmt(stats?.totalProducts)} total</span>
          </div>
          <p className="text-gray-500 text-xs mb-4">Add a new product or manage existing ones.</p>
          <div className="flex gap-3">
            <Link
              to="/admin/products"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#00d4ff] hover:bg-[#00b8e6] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Product
            </Link>
            <Link
              to="/admin/products"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-600 hover:text-[#0f172a] hover:border-gray-300 hover:bg-gray-50 text-xs font-bold rounded-lg transition-colors"
            >
              <Package className="w-4 h-4" /> View All
            </Link>
          </div>
        </div>

        {/* Orders Quick Action */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0f172a] font-black text-sm uppercase tracking-widest">Orders</h3>
            {stats?.pendingOrders > 0 && (
              <span className="bg-yellow-50 text-yellow-600 border border-yellow-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {stats.pendingOrders} Pending
              </span>
            )}
          </div>
          <p className="text-gray-500 text-xs mb-4">Enter phone orders manually or update order statuses.</p>
          <div className="flex gap-3">
            <Link
              to="/admin/orders"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> New Order
            </Link>
            <Link
              to="/admin/orders"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-600 hover:text-[#0f172a] hover:border-gray-300 hover:bg-gray-50 text-xs font-bold rounded-lg transition-colors"
            >
              <ShoppingCart className="w-4 h-4" /> Manage
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;


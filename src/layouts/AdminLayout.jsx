import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products',   icon: Package,         label: 'Products'  },
    { path: '/admin/deals',      icon: Tag,             label: 'Deals'     },
    { path: '/admin/orders',     icon: ShoppingCart,    label: 'Orders'    },
    { path: '/admin/users',      icon: Users,           label: 'Users'     },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fe] flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#00d4ff] rounded-lg flex items-center justify-center text-white shadow-md"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-[0_4px_10px_rgba(0,212,255,0.2)]">
                A
              </div>
              <div>
                <h1 className="text-[#0f172a] font-black text-lg">ADMIN</h1>
                <p className="text-gray-500 text-xs font-medium">TechStore Panel</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                    isActive
                      ? 'bg-[#00d4ff]/10 text-[#00b8e6] border border-[#00d4ff]/20'
                      : 'text-gray-500 hover:text-[#0f172a] hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:text-[#0f172a] hover:bg-gray-50 transition-all font-medium border border-transparent"
            >
              <Home className="w-5 h-5" />
              <span>Back to Store</span>
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all font-medium border border-transparent"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-0 overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 lg:ml-0 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-[#0f172a] font-black text-xl capitalize">
                {location.pathname.split('/').pop() || 'Dashboard'}
              </h1>
              <p className="text-gray-500 text-sm font-medium">Welcome back, {user?.name || 'Admin'}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] rounded-full flex items-center justify-center text-white font-bold shadow-[0_4px_10px_rgba(0,212,255,0.2)]">
                {user?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;

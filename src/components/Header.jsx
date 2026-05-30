import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  Truck, ShieldCheck, RotateCcw, Headphones,
  Search, User, Heart, ShoppingCart,
  ChevronDown, Menu, X, LogOut, LayoutDashboard,
  Keyboard, Mouse, Monitor, Gamepad2, Package, Wifi
} from 'lucide-react';

const CATEGORIES = [
  { id: 'controller',  name: 'PlayStation', icon: Gamepad2   },
  { id: 'xbox',        name: 'Xbox',        icon: Gamepad2   },
  { id: 'controllers', name: 'Controllers', icon: Gamepad2   },
  { id: 'headset',     name: 'Headsets',    icon: Headphones },
  { id: 'keyboard',    name: 'Keyboards',   icon: Keyboard   },
  { id: 'mouse',       name: 'Mouse',       icon: Mouse      },
  { id: 'networking',  name: 'Networking',  icon: Wifi       },
  { id: 'accessories', name: 'Accessories', icon: Package    },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const catRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white/95 backdrop-blur-md text-[#1a1a1a] sticky top-0 z-50 border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
      {/* Top Bar */}
      <div className="hidden md:flex justify-between items-center py-2 px-4 lg:px-8 border-b border-gray-100/50 text-[11px] text-gray-500 bg-[#fafafa]">
        <div className="flex items-center gap-2 group cursor-pointer">
          <Truck className="w-3.5 h-3.5 text-[#003791] group-hover:scale-110 transition-transform" />
          <span className="font-medium tracking-wide">Cash on Delivery Available All Over Pakistan</span>
        </div>
        <div className="flex items-center gap-6">
          {[ 
            { icon: Truck, text: "Fast Delivery" },
            { icon: RotateCcw, text: "7 Days Return" },
            { icon: ShieldCheck, text: "100% Original Products" },
            { icon: Headphones, text: "Support 24/7" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 group cursor-pointer">
              <item.icon className="w-3.5 h-3.5 text-[#003791] group-hover:scale-110 transition-transform" />
              <span className="hover:text-gray-800 transition-colors">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img
              src="/ChatGPT_Image_May_30__2026__07_47_36_PM-removebg-preview.png"
              alt="E-Tech Logo"
              className="h-20 w-auto object-contain group-hover:scale-105 transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-2 text-[15px] font-semibold flex-shrink-0">
            <Link to="/" className={`relative px-4 py-2 rounded-full transition-all duration-300 ${isActive('/') ? 'text-[#003791] bg-[#003791]/5 shadow-sm' : 'text-gray-600 hover:text-[#003791] hover:bg-gray-50'}`}>
              Home
            </Link>
            <Link to="/shop" className={`relative px-4 py-2 rounded-full transition-all duration-300 ${isActive('/shop') ? 'text-[#003791] bg-[#003791]/5 shadow-sm' : 'text-gray-600 hover:text-[#003791] hover:bg-gray-50'}`}>
              Shop
            </Link>

            {/* Categories Dropdown */}
            <div ref={catRef} className="relative group/cat">
              <button
                onClick={() => setCatOpen((o) => !o)}
                className="flex items-center gap-1.5 px-4 py-2 text-gray-600 hover:text-[#003791] hover:bg-gray-50 rounded-full transition-all duration-300"
              >
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${catOpen ? 'rotate-180 text-[#003791]' : ''}`} />
              </button>
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] py-3 z-50 transition-all duration-300 origin-top-left ${catOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                {CATEGORIES.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={`${cat.id}-${i}`}
                      to={`/shop?category=${cat.id}`}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-gray-600 hover:text-[#003791] hover:bg-[#003791]/5 transition-all group/item"
                    >
                      <div className="p-1.5 rounded-lg bg-gray-50 group-hover/item:bg-white group-hover/item:shadow-sm transition-all">
                        <Icon className="w-4 h-4 text-gray-400 group-hover/item:text-[#003791] transition-colors" />
                      </div>
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link to="/deals" className={`relative px-4 py-2 rounded-full transition-all duration-300 ${isActive('/deals') ? 'text-[#003791] bg-[#003791]/5 shadow-sm' : 'text-gray-600 hover:text-[#003791] hover:bg-gray-50'}`}>
              Deals
            </Link>
            <Link to="/about" className={`relative px-4 py-2 rounded-full transition-all duration-300 ${isActive('/about') ? 'text-[#003791] bg-[#003791]/5 shadow-sm' : 'text-gray-600 hover:text-[#003791] hover:bg-gray-50'}`}>
              About
            </Link>
            <Link to="/contact" className={`relative px-4 py-2 rounded-full transition-all duration-300 ${isActive('/contact') ? 'text-[#003791] bg-[#003791]/5 shadow-sm' : 'text-gray-600 hover:text-[#003791] hover:bg-gray-50'}`}>
              Contact
            </Link>
          </nav>

          {/* Search Bar (desktop) */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-sm relative ml-4">
            <form onSubmit={handleSearch} className="w-full relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium gear..."
                className="w-full bg-gray-50 border border-transparent hover:border-gray-200 focus:bg-white focus:border-[#003791]/30 rounded-full pl-5 pr-12 py-2.5 text-[15px] text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#003791]/5 transition-all duration-300 shadow-sm"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="w-4 h-4 text-gray-500 group-focus-within:text-[#003791] transition-colors" />
              </button>
            </form>
          </div>

          {/* Icon Group */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">

            {/* Mobile Search */}
            <button className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setSearchOpen((o) => !o)}>
              <Search className="w-5 h-5 text-gray-600 hover:text-[#003791]" />
            </button>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative group hidden sm:block">
                <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#003791] to-[#001e52] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md shadow-[#003791]/20">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 hidden xl:block">{user?.name?.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 top-full mt-3 w-56 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2 origin-top-right scale-95 group-hover:scale-100">
                  <div className="px-5 py-3 border-b border-gray-100/50 mb-1 bg-gray-50/50">
                    <p className="text-[#1a1a1a] font-bold text-[15px] truncate">{user?.name}</p>
                    <p className="text-gray-500 text-xs font-medium truncate mt-0.5">{user?.email}</p>
                  </div>
                  {user?.role === 'admin' ? (
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-5 py-2.5 text-[#003791] hover:bg-[#003791]/5 transition-colors text-sm font-bold">
                      <ShieldCheck className="w-4 h-4" />Admin Panel
                    </Link>
                  ) : (
                    <Link to="/dashboard" className="flex items-center gap-3 px-5 py-2.5 text-gray-600 hover:text-[#003791] hover:bg-[#003791]/5 transition-colors text-sm font-semibold">
                      <LayoutDashboard className="w-4 h-4" />My Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="w-full flex items-center gap-3 px-5 py-2.5 text-red-500 hover:bg-red-50 transition-colors text-sm font-semibold">
                    <LogOut className="w-4 h-4" />Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
                <User className="w-5 h-5 text-gray-600 hover:text-[#003791]" />
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-all duration-300 group">
              <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-[#003791] transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#003791] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-white transform group-hover:scale-110 transition-transform">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setMobileOpen((o) => !o)}>
              {mobileOpen ? <X className="w-6 h-6 text-[#1a1a1a]" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="lg:hidden pb-4 px-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium gear..."
                autoFocus
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-5 pr-12 py-3 text-[15px] text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#003791]/50 focus:ring-4 focus:ring-[#003791]/5 transition-all shadow-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-4 space-y-2 shadow-2xl absolute w-full left-0">
          <Link to="/" className={`block px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${isActive('/') ? 'text-[#003791] bg-[#003791]/5' : 'text-gray-700 hover:text-[#003791] hover:bg-gray-50'}`}>Home</Link>
          <Link to="/shop" className={`block px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${isActive('/shop') ? 'text-[#003791] bg-[#003791]/5' : 'text-gray-700 hover:text-[#003791] hover:bg-gray-50'}`}>Shop</Link>
          <div className="px-4 py-3 bg-gray-50/50 rounded-2xl">
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-3">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <Link key={`${cat.id}-${i}`} to={`/shop?category=${cat.id}`} className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-[#003791] text-sm rounded-xl hover:bg-white hover:shadow-sm transition-all font-semibold border border-transparent hover:border-gray-100">
                    <div className="p-1.5 rounded-lg bg-white shadow-sm">
                      <Icon className="w-4 h-4 text-[#003791]" />
                    </div>
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <Link to="/deals" className="block px-4 py-3 rounded-xl text-[15px] font-bold text-gray-700 hover:text-[#003791] hover:bg-gray-50 transition-all">Deals</Link>
          <Link to="/about" className="block px-4 py-3 rounded-xl text-[15px] font-bold text-gray-700 hover:text-[#003791] hover:bg-gray-50 transition-all">About</Link>
          <Link to="/contact" className="block px-4 py-3 rounded-xl text-[15px] font-bold text-gray-700 hover:text-[#003791] hover:bg-gray-50 transition-all">Contact</Link>
          <div className="h-px bg-gray-100 my-2"></div>
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' ? (
                <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-black text-[#003791] hover:bg-[#003791]/5 transition-all"><ShieldCheck className="w-5 h-5"/>Admin Panel</Link>
              ) : (
                <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-bold text-gray-700 hover:text-[#003791] hover:bg-gray-50 transition-all"><LayoutDashboard className="w-5 h-5"/>My Dashboard</Link>
              )}
              <button onClick={logout} className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold text-red-500 hover:bg-red-50 transition-all"><LogOut className="w-5 h-5"/>Logout</button>
            </>
          ) : (
            <Link to="/login" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[15px] font-bold text-white bg-[#003791] hover:bg-blue-800 transition-all shadow-lg shadow-[#003791]/30 mt-4">
              <User className="w-5 h-5" /> Login / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Package, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { productsAPI } from '../services/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import WhyChooseUs from '../components/WhyChooseUs';

const CATEGORIES = [
  { id: 'all',         name: 'All Products' },
  { id: 'controller', name: 'PlayStation'   },
  { id: 'controller', name: 'Xbox'          },
  { id: 'controller', name: 'Controllers'   },
  { id: 'headset',    name: 'Headsets'      },
  { id: 'keyboard',   name: 'Keyboards'     },
  { id: 'mouse',      name: 'Mouse'         },
  { id: 'mousepad',   name: 'Mousepads'     },
  { id: 'accessories',name: 'Networking'    },
  { id: 'accessories',name: 'Accessories'   },
];

const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest First'       },
  { value: 'price',      label: 'Price: Low to High' },
  { value: '-price',     label: 'Price: High to Low' },
  { value: '-soldCount', label: 'Best Selling'        },
];

const Shop = () => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const navRef = useRef(null);

  const [products, setProducts]   = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading]     = useState(true);
  const [activeCat, setActiveCat] = useState(() => searchParams.get('category') || 'all');
  const [activeLabel, setActiveLabel] = useState('All Products');
  const [sort, setSort]           = useState('-createdAt');
  const [search, setSearch]       = useState(() => searchParams.get('search') || '');
  const [searchInput, setSearchInput] = useState(() => searchParams.get('search') || '');
  const [page, setPage]           = useState(1);
  const [sortOpen, setSortOpen]   = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync URL params
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const q   = searchParams.get('search')   || '';
    const match = CATEGORIES.find(c => c.id === cat);
    setActiveCat(cat);
    setActiveLabel(match?.name || 'All Products');
    setSearch(q);
    setSearchInput(q);
    setPage(1);
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12, sort };
      if (activeCat !== 'all') params.category = activeCat;
      if (search) params.search = search;
      const res = await productsAPI.getAll(params);
      setProducts(res.products || []);
      setPagination(res.pagination || { page: 1, pages: 1, total: 0 });
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, sort, activeCat, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleCat = (cat) => {
    setActiveCat(cat.id);
    setActiveLabel(cat.name);
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`${product.name} added to cart!`, 'success');
  };

  const discount = (p) =>
    p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : null;

  const fmt = (n) => Number(n).toLocaleString('en-PK');

  return (
    <div className="bg-white min-h-screen">

      {/* Page Hero Banner */}
      <div className="bg-[#003791] py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-blue-300 text-xs flex items-center gap-2 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Shop</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
            {activeLabel}
          </h1>
          <p className="text-blue-200 text-sm max-w-lg">
            100% original gaming gear — PlayStation, Xbox, Controllers, Headsets & more. Cash on Delivery all over Pakistan.
          </p>
        </div>
      </div>

      {/* Sticky Category Nav — PS Website style */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={navRef} className="flex items-center overflow-x-auto gap-1 hide-scrollbar">
            {CATEGORIES.map((cat, i) => {
              const isActive = activeCat === cat.id && activeLabel === cat.name;
              return (
                <button
                  key={`${cat.id}-${i}`}
                  onClick={() => handleCat(cat)}
                  className={`flex-shrink-0 px-4 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-[#003791] text-[#003791]'
                      : 'border-transparent text-gray-500 hover:text-[#1a1a1a] hover:border-gray-300'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">

          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#f5f5f5] border border-gray-200 rounded-full pl-10 pr-10 py-2.5 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#003791]/50 transition-colors"
            />
            {searchInput && (
              <button type="button" onClick={() => { setSearchInput(''); setSearch(''); setPage(1); }} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400 hover:text-[#1a1a1a]" />
              </button>
            )}
          </form>

          <div className="flex items-center gap-3">
            {/* Count */}
            <p className="text-gray-400 text-sm hidden sm:block">
              {loading ? '...' : `${pagination.total} products`}
            </p>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:border-gray-400 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                Sort
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setPage(1); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sort === opt.value
                          ? 'text-[#003791] font-black bg-[#003791]/5'
                          : 'text-gray-600 hover:text-[#1a1a1a] hover:bg-gray-50 font-medium'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active search badge */}
        {search && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Results for:</span>
            <span className="flex items-center gap-1.5 bg-[#003791]/10 text-[#003791] text-sm font-bold px-3 py-1 rounded-full">
              "{search}"
              <button onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}>
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="aspect-square bg-[#f5f5f5]" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-9 bg-gray-100 rounded mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-[#f5f5f5] rounded-full flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-[#1a1a1a] font-black text-xl mb-2">No products found</h3>
            <p className="text-gray-400 text-sm mb-6">Try a different category or search term</p>
            <button
              onClick={() => { setActiveCat('all'); setActiveLabel('All Products'); setSearch(''); setSearchInput(''); }}
              className="bg-[#003791] hover:bg-[#002a6e] text-white font-bold px-6 py-3 rounded-full text-sm transition-colors"
            >
              View All Products
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCat}-${page}-${sort}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
            >
              {products.map((product) => {
                const off = discount(product);
                return (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <Link to={`/product/${product._id}`} className="relative aspect-square bg-[#f8f8f8] flex items-center justify-center overflow-hidden p-4">
                      {off && (
                        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          -{off}%
                        </span>
                      )}
                      {product.isFeatured && !off && (
                        <span className="absolute top-3 left-3 z-10 bg-[#003791] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          FEATURED
                        </span>
                      )}
                      {product.stock === 0 && (
                        <span className="absolute top-3 right-3 z-10 bg-gray-400 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          SOLD OUT
                        </span>
                      )}
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Package className="w-12 h-12 text-gray-300" />
                      )}
                    </Link>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-gray-400 text-[11px] uppercase tracking-wider font-bold mb-1 capitalize">
                        {product.category}
                      </p>
                      <Link to={`/product/${product._id}`}>
                        <h3 className="font-black text-[#1a1a1a] text-sm leading-tight line-clamp-2 mb-3 group-hover:text-[#003791] transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-[#1a1a1a] font-black text-lg">Rs. {fmt(product.price)}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-gray-400 text-xs line-through">Rs. {fmt(product.originalPrice)}</span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-[#003791] hover:bg-[#002a6e] text-white font-bold text-xs py-2.5 rounded-xl transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                          </button>
                          <Link
                            to={`/product/${product._id}`}
                            className="w-10 flex items-center justify-center border border-gray-200 hover:border-[#003791] hover:text-[#003791] rounded-xl transition-colors text-gray-400"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:border-[#003791] hover:text-[#003791] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full text-sm font-black transition-colors ${
                  page === i + 1
                    ? 'bg-[#003791] text-white'
                    : 'border border-gray-200 text-gray-500 hover:border-[#003791] hover:text-[#003791]'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
              className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:border-[#003791] hover:text-[#003791] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Why Choose Us */}
      <WhyChooseUs />
    </div>
  );
};

export default Shop;

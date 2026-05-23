import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Tag } from 'lucide-react';
import { productsAPI } from '../services/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';

const Deals = () => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Deals — E-Tech';
    productsAPI.getAll({ limit: 24, sort: '-soldCount' })
      .then(res => {
        const all = res.products || [];
        const deals = all.filter(p => p.originalPrice && p.originalPrice > p.price);
        setProducts(deals.length > 0 ? deals : all.slice(0, 12));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n) => Number(n).toLocaleString('en-PK');
  const off = (p) => p.originalPrice && p.originalPrice > p.price
    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
    : null;

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Banner */}
      <div className="bg-[#003791]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-blue-300 text-xs flex items-center gap-2 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Deals</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-200 text-xs font-bold tracking-widest uppercase">Limited Time Offers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
            Hot Deals
          </h1>
          <p className="text-blue-200 text-sm max-w-md">
            Exclusive discounts on PlayStation, Xbox, Controllers & more. 100% original — Cash on Delivery.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
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
          <div className="flex flex-col items-center py-24 text-center">
            <div className="w-20 h-20 bg-[#f5f5f5] rounded-full flex items-center justify-center mb-4">
              <Tag className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-[#1a1a1a] font-black text-xl mb-2">No deals right now</h3>
            <p className="text-gray-400 text-sm mb-6">Check back soon for exclusive discounts!</p>
            <Link to="/shop" className="bg-[#003791] hover:bg-[#002a6e] text-white font-bold px-6 py-3 rounded-full text-sm transition-colors">
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#1a1a1a]">{products.length} Deals Available</h2>
              <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full">SALE ON NOW</span>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {products.map((product, i) => {
                const discount = off(product);
                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <Link to={`/product/${product._id}`} className="relative aspect-square bg-[#f8f8f8] flex items-center justify-center overflow-hidden p-4">
                      {discount && (
                        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full">
                          -{discount}%
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
                      <p className="text-gray-400 text-[11px] uppercase tracking-wider font-bold mb-1 capitalize">{product.category}</p>
                      <Link to={`/product/${product._id}`}>
                        <h3 className="font-black text-[#1a1a1a] text-sm leading-tight line-clamp-2 mb-3 group-hover:text-[#003791] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-[#1a1a1a] font-black text-lg">Rs. {fmt(product.price)}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-gray-400 text-xs line-through">Rs. {fmt(product.originalPrice)}</span>
                          )}
                        </div>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-green-600 text-xs font-bold mb-3">
                            You save Rs. {fmt(product.originalPrice - product.price)}
                          </p>
                        )}
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className="w-full flex items-center justify-center gap-2 bg-[#003791] hover:bg-[#002a6e] text-white font-bold text-xs py-2.5 rounded-xl transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Deals;

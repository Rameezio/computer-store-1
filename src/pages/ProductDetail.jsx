import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Truck, RotateCcw, Headphones as HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { productsAPI } from '../services/products';
import WhyChooseUs from '../components/WhyChooseUs';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await productsAPI.getById(id);
      const p = res.product;
      setProduct(p);
      document.title = `${p.name} — E-Tech`;
      if (p.category) {
        const related = await productsAPI.getAll({ category: p.category, limit: 4 });
        setRelatedProducts(related.products?.filter((r) => r._id !== p._id).slice(0, 4) || []);
      }
    } catch {
      addToast('Product not found', 'error');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.images?.[0],
        stock: product.stock,
      },
      quantity
    );
    addToast(`${product.name} added to cart!`, 'success');
  };

  const formatPrice = (price) => Number(price).toLocaleString('en-PK');

  if (loading) {
    return (
      <div className="bg-[#f8f9fe] min-h-screen pt-8 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Skeleton */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20 animate-pulse">
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] rounded-2xl bg-gray-200 mb-4" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 rounded-xl bg-gray-200" />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-10 w-full rounded bg-gray-200" />
              <div className="h-6 w-32 rounded bg-gray-200" />
              <div className="h-20 w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const images = product.images?.length ? product.images : ['https://via.placeholder.com/800'];
  const inStock = product.stock > 0;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-[#f8f9fe] min-h-screen pb-12 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="text-gray-500 text-[10px] sm:text-xs flex items-center gap-2 mb-8 font-medium whitespace-nowrap overflow-x-auto hide-scrollbar">
          <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <Link to="/shop" className="hover:text-[#00d4ff] transition-colors">Shop</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="hover:text-[#00d4ff] transition-colors cursor-pointer capitalize">{product.category}</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-[#0f172a] truncate font-bold">{product.name}</span>
        </div>

        {/* Top Product Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20">

          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-2xl bg-white shadow-xl shadow-[#00d4ff]/5 border border-gray-100 flex items-center justify-center p-8 overflow-hidden group">
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {inStock
                  ? <span className="bg-[#25D366] text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-wider">IN STOCK</span>
                  : <span className="bg-red-500 text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-wider">OUT OF STOCK</span>
                }
                {discount && <span className="bg-[#00d4ff] text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-wider">-{discount}%</span>}
              </div>
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-md transition-opacity duration-300"
              />
              <div className="absolute bottom-4 right-4 text-[10px] font-bold text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
                {activeImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
                className="w-8 h-8 flex-shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#0f172a] shadow-sm transition-all hidden sm:flex"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-1 gap-2 sm:gap-4 overflow-x-auto hide-scrollbar p-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 bg-white ${
                      activeImage === idx
                        ? 'border-2 border-[#00d4ff] shadow-[0_4px_15px_rgba(0,212,255,0.15)] opacity-100'
                        : 'border border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100 shadow-sm'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
                className="w-8 h-8 flex-shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#0f172a] shadow-sm transition-all hidden sm:flex"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-[#00d4ff] text-[10px] font-bold tracking-widest uppercase mb-2 capitalize">{product.category}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] leading-tight mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-end gap-4 mb-4">
              <span className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">Rs. {formatPrice(product.price)}</span>
              {product.originalPrice && (
                <div className="flex items-center gap-2 pb-1.5">
                  <span className="text-gray-400 line-through text-sm sm:text-base font-medium">Rs. {formatPrice(product.originalPrice)}</span>
                  {discount && (
                    <span className="bg-[#00d4ff]/10 text-[#00d4ff] px-2 py-0.5 rounded text-xs font-bold border border-[#00d4ff]/20">
                      -{discount}%
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6 text-xs">
              {inStock ? (
                <div className="flex items-center gap-1 text-[#25D366] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-500 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Out of Stock</span>
                </div>
              )}
              {inStock && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500 font-medium">Only {product.stock} left</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">{product.description}</p>

            {/* Specs */}
            {product.specs && [...product.specs.entries?.() ?? Object.entries(product.specs)].length > 0 && (
              <div className="mb-6 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <table className="w-full text-xs">
                  <tbody>
                    {[...product.specs.entries?.() ?? Object.entries(product.specs)].map(([key, val]) => (
                      <tr key={key} className="border-b border-gray-100 last:border-0">
                        <td className="py-2.5 text-gray-500 font-semibold w-1/3">{key}</td>
                        <td className="py-2.5 text-[#0f172a] font-medium">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#0f172a] hover:bg-gray-200 transition-colors"
                  >-</button>
                  <span className="w-12 h-10 flex items-center justify-center text-[#0f172a] bg-white font-bold border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={!inStock}
                    className="w-10 h-10 flex items-center justify-center text-[#0f172a] hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >-</button>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="w-full bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] hover:from-[#00b8e6] hover:to-[#2563eb] text-white font-bold py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(0,212,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                </motion.button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-xs text-gray-600 font-bold">1 Year Official Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-xs text-gray-600 font-bold">7 Days Return Policy</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-xs text-gray-600 font-bold">Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <HeadphonesIcon className="w-5 h-5 text-[#00d4ff]" />
                <span className="text-xs text-gray-600 font-bold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase tracking-tight">YOU MAY ALSO LIKE</h2>
              <Link to="/shop" className="text-[#00d4ff] text-xs font-bold uppercase hover:text-[#00b8e6] transition-colors flex items-center gap-1">
                VIEW ALL
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <div key={rp._id} className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#00d4ff]/10 hover:border-[#00d4ff]/20 transition-all duration-300 flex flex-col group">
                  <Link to={`/product/${rp._id}`} className="relative aspect-square mb-4 bg-gray-50 rounded-xl p-4 flex items-center justify-center overflow-hidden border border-gray-100/50">
                    <img src={rp.images?.[0]} alt={rp.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                  </Link>
                  <div className="flex-grow flex flex-col">
                    <Link to={`/product/${rp._id}`}>
                      <h3 className="text-[#0f172a] font-black text-sm mb-1 line-clamp-1 group-hover:text-[#00d4ff] transition-colors">{rp.name}</h3>
                    </Link>
                    <p className="text-gray-500 text-[11px] font-bold mb-3 capitalize">{rp.category}</p>
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-[#0f172a] font-black text-lg tracking-tight">Rs. {formatPrice(rp.price)}</span>
                        {rp.originalPrice && (
                          <span className="text-gray-400 text-xs line-through font-medium">Rs. {formatPrice(rp.originalPrice)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart({ id: rp._id, name: rp.name, category: rp.category, price: rp.price, image: rp.images?.[0], stock: rp.stock }, 1)}
                        className="w-full bg-white border border-gray-200 hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/5 hover:text-[#00d4ff] text-[#0f172a] text-[11px] font-black py-3 rounded-lg transition-all uppercase tracking-wider shadow-sm"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <WhyChooseUs />
    </div>
  );
};

export default ProductDetail;

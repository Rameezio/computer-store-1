import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingCart, Package } from 'lucide-react'
import { productsAPI } from '../services/products'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'

const FeaturedProducts = () => {
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsAPI.getAll({ limit: 8, sort: '-createdAt' })
      .then(res => setProducts(res.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
    addToast(`${product.name} added to cart!`, 'success')
  }

  const discount = (p) =>
    p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : null

  if (loading) {
    return (
      <section className="bg-[#f5f5f5] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-8 bg-gray-100 rounded mt-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section className="bg-[#f5f5f5] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] tracking-tight">
            New Arrivals
          </h2>
          <Link to="/shop" className="flex items-center gap-1.5 text-[#003791] text-sm font-bold hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => {
            const off = discount(product)
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col">

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
                    <Link to={`/product/${product._id}`}>
                      <h3 className="font-black text-[#1a1a1a] text-sm leading-tight line-clamp-2 mb-1 group-hover:text-[#003791] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-xs capitalize mb-3">{product.category}</p>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-[#1a1a1a] font-black text-lg">Rs. {product.price?.toLocaleString()}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-gray-400 text-xs line-through">Rs. {product.originalPrice?.toLocaleString()}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="w-full flex items-center justify-center gap-2 bg-[#003791] hover:bg-[#002a6e] text-white font-bold text-xs py-2.5 rounded-xl transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts

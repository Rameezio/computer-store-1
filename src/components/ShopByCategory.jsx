import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const categories = [
  {
    name: 'PlayStation',
    sub: 'PS5 & PS4',
    slug: 'playstation',
    color: '#003791',
    bg: '#e8eef8',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Xbox',
    sub: 'Series X & S',
    slug: 'xbox',
    color: '#107C10',
    bg: '#e8f3e8',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Controllers',
    sub: 'All Platforms',
    slug: 'controller',
    color: '#1a1a1a',
    bg: '#f0f0f0',
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Console Gaming',
    sub: 'Discs & Games',
    slug: 'disc',
    color: '#1a1a1a',
    bg: '#f0f0f0',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Headsets',
    sub: 'Gaming & Pro',
    slug: 'headset',
    color: '#1a1a1a',
    bg: '#f0f0f0',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Keyboards',
    sub: 'Mechanical & More',
    slug: 'keyboard',
    color: '#1a1a1a',
    bg: '#f0f0f0',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Mouse',
    sub: 'Gaming & Office',
    slug: 'mouse',
    color: '#1a1a1a',
    bg: '#f0f0f0',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Networking',
    sub: 'Cables & Routers',
    slug: 'networking',
    color: '#1a1a1a',
    bg: '#f0f0f0',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Accessories',
    sub: 'All Extras',
    slug: 'accessories',
    color: '#1a1a1a',
    bg: '#f0f0f0',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=400&q=80',
  },
]

const ShopByCategory = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] tracking-tight">
            Browse by Category
          </h2>
          <Link to="/shop" className="text-[#003791] text-sm font-bold hover:underline hidden sm:block">
            All Products →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="block group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="bg-white px-3 py-2.5">
                  <p className="font-black text-[#1a1a1a] text-xs tracking-tight">{cat.name}</p>
                  <p className="text-gray-400 text-[10px]">{cat.sub}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopByCategory

import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const platforms = [
  {
    name: 'PlayStation',
    tagline: 'PS5 & PS4 Consoles, Controllers & Games',
    color: '#003791',
    textColor: 'white',
    slug: 'controller',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Xbox',
    tagline: 'Series X, Series S, Controllers & Accessories',
    color: '#107C10',
    textColor: 'white',
    slug: 'controller',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Console Gaming',
    tagline: 'PS5, Xbox, Controllers & Games',
    color: '#1a1a1a',
    textColor: 'white',
    slug: 'controller',
    image: 'https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Networking',
    tagline: 'Routers, Cables & Network Gear',
    color: '#f5f5f5',
    textColor: '#1a1a1a',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  },
]

const BuildYourSetup = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] tracking-tight">
            Shop by Platform
          </h2>
          <p className="text-gray-400 text-sm hidden sm:block">Choose your ecosystem</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Link
                to={`/shop?category=${platform.slug}`}
                className="group block rounded-2xl overflow-hidden relative h-52 hover:shadow-2xl transition-all duration-300"
                style={{ backgroundColor: platform.color }}
              >
                <img
                  src={platform.image}
                  alt={platform.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3
                    className="font-black text-xl tracking-tight mb-1"
                    style={{ color: platform.textColor }}
                  >
                    {platform.name}
                  </h3>
                  <p
                    className="text-xs mb-3 opacity-80"
                    style={{ color: platform.textColor }}
                  >
                    {platform.tagline}
                  </p>
                  <div
                    className="flex items-center gap-1 text-xs font-black"
                    style={{ color: platform.textColor }}
                  >
                    Shop Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BuildYourSetup

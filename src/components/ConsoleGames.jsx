import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const consoles = [
  {
    name: 'PlayStation 5',
    tagline: 'Experience next-gen gaming with the PS5.',
    badge: 'PS5',
    badgeColor: '#003791',
    bg: 'from-[#003791] to-[#001f5a]',
    slug: 'playstation',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'PlayStation 4',
    tagline: 'Hundreds of titles. Timeless gameplay.',
    badge: 'PS4',
    badgeColor: '#0070cc',
    bg: 'from-[#0070cc] to-[#004a99]',
    slug: 'playstation',
    image: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Xbox Series X',
    tagline: 'The fastest, most powerful Xbox ever.',
    badge: 'Xbox',
    badgeColor: '#107C10',
    bg: 'from-[#107C10] to-[#084808]',
    slug: 'xbox',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Xbox Series S',
    tagline: 'Next-gen performance at a compact size.',
    badge: 'Xbox',
    badgeColor: '#1a9c1a',
    bg: 'from-[#1a9c1a] to-[#107C10]',
    slug: 'xbox',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80',
  },
]

const ConsoleGames = () => {
  return (
    <section className="bg-[#f5f5f5] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[#003791] text-xs font-black tracking-widest uppercase block mb-1">Consoles & Gaming</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] tracking-tight">
              Shop by Console
            </h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1.5 text-[#003791] text-sm font-bold hover:underline hidden sm:flex">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {consoles.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Link
                to={`/shop?category=${item.slug}`}
                className={`group block rounded-2xl overflow-hidden bg-gradient-to-br ${item.bg} relative h-64 hover:shadow-2xl transition-shadow duration-300`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <span
                    className="self-start text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-white/30 bg-white/10"
                  >
                    {item.badge}
                  </span>
                  <div>
                    <h3 className="text-white font-black text-xl tracking-tight mb-1">{item.name}</h3>
                    <p className="text-white/70 text-xs mb-4">{item.tagline}</p>
                    <div className="flex items-center gap-1 text-white text-xs font-black">
                      Shop Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
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

export default ConsoleGames

import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Truck, Zap, ShieldCheck, RotateCcw, Headphones } from 'lucide-react'

const floatingCards = [
  { id: 1, title: 'Consoles',      sub: 'PS5 & Xbox',        slug: 'controller', img: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=300&q=80', position: 'top-[8%] left-4'    },
  { id: 2, title: 'Pro Keyboards', sub: 'Mechanical & More', slug: 'keyboard',   img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80', position: 'bottom-[8%] left-4'  },
  { id: 3, title: 'Gaming Mice',   sub: 'Precision Tracking',slug: 'mouse',      img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80', position: 'top-[8%] right-4'   },
  { id: 4, title: 'Pro Headsets',  sub: 'Immersive Audio',   slug: 'headset',    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80', position: 'bottom-[8%] right-4' },
]

const trust = [
  { icon: Truck,       label: 'Cash on Delivery', sub: 'All over Pakistan'  },
  { icon: Zap,         label: 'Fast Delivery',    sub: 'Under 3-5 days'     },
  { icon: ShieldCheck, label: '100% Original',    sub: 'Genuine products'   },
  { icon: RotateCcw,   label: '7 Days Return',    sub: 'Hassle-free policy' },
  { icon: Headphones,  label: '24/7 Support',     sub: 'Always here for you'},
]

const Hero = () => (
  <section className="bg-[#f8f9fe] w-full">

    {/* Main Banner */}
    <div className="relative overflow-hidden">
      {/* Background image — only on md+ */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat pointer-events-none z-0 hidden md:block"
        style={{ backgroundImage: "url('/bg-podium.png')" }}
      />

      {/* Floating cards — xl only */}
      <div className="absolute inset-0 pointer-events-none z-30 hidden xl:block">
        {floatingCards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`absolute ${card.position} w-[200px] pointer-events-auto`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
          >
            <Link
              to={`/shop?category=${card.slug}`}
              className="flex flex-col items-center bg-white p-5 rounded-[20px] shadow-[0_15px_50px_rgba(0,0,0,0.08)] w-full hover:scale-105 hover:-translate-y-1 transition-transform border border-white/80"
            >
              <div className="w-24 h-20 mb-3 flex items-center justify-center">
                <img src={card.img} alt={card.title} className="max-w-full max-h-full object-cover rounded-xl" />
              </div>
              <h3 className="text-[#0f172a] font-extrabold text-[13px] text-center truncate w-full">{card.title}</h3>
              <p className="text-gray-500 font-medium text-[11px] mt-0.5">{card.sub}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Text content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 flex flex-col items-center text-center">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-[#00d4ff] font-bold tracking-[0.2em] uppercase text-[11px] sm:text-xs mb-3 flex items-center justify-center gap-2">
            <span>//</span> LEVEL UP YOUR SETUP <span>//</span>
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-black text-[#0f172a] leading-[1.15] tracking-tight mb-4">
            High Performance Gear <br className="hidden sm:block" />
            For{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#3b82f6]">
              Every Gamer
            </span>
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mb-7 max-w-md mx-auto leading-relaxed">
            Authentic consoles, gaming gear & accessories. Cash on Delivery across Pakistan.
          </p>

          <div className="flex flex-row gap-3 justify-center flex-wrap">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] text-white font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-[0_8px_20px_rgba(0,212,255,0.3)] text-sm whitespace-nowrap"
            >
              Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/deals"
              className="inline-flex items-center justify-center bg-white border border-gray-200 text-[#0f172a] font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm whitespace-nowrap"
            >
              View Deals
            </Link>
          </div>
        </motion.div>

        {/* Spacer for xl floating cards */}
        <div className="hidden xl:block h-36" />
      </div>
    </div>

    {/* Trust / Category Bar */}
    <div className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile: 2x2 category cards */}
        <div className="grid grid-cols-2 gap-3 py-4 sm:hidden">
          {[
            { label: 'Consoles',  sub: 'PS5 & Xbox',      slug: 'controller', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=200&q=80' },
            { label: 'Keyboards', sub: 'Mech & More',      slug: 'keyboard',   image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80' },
            { label: 'Mouse',     sub: 'Gaming & Office',  slug: 'mouse',      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80' },
            { label: 'Headsets',  sub: 'Gaming & Pro',     slug: 'headset',    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80' },
          ].map((item) => (
            <Link
              key={item.label}
              to={`/shop?category=${item.slug}`}
              className="flex items-center gap-2.5 bg-[#f8f8f8] rounded-xl p-2.5 hover:bg-[#f0f4ff] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[#0f172a] font-black text-xs">{item.label}</p>
                <p className="text-gray-400 text-[10px]">{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* sm+: Trust bar */}
        <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-4 py-5">
          {trust.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="w-6 h-6 text-[#00d4ff] flex-shrink-0" strokeWidth={1.8} />
              <div>
                <p className="text-[#0f172a] font-bold text-xs">{label}</p>
                <p className="text-gray-400 text-[11px]">{sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>

  </section>
)

export default Hero

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Truck, Headphones, RotateCcw, Users, Package, Star, Award, ArrowRight } from 'lucide-react';

const STATS = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '500+',    label: 'Products'          },
  { value: '5+',      label: 'Years Experience'  },
  { value: '4.9/5',   label: 'Customer Rating'   },
];

const VALUES = [
  { icon: Shield,     title: '100% Authentic', desc: 'Every product is 100% original, sourced directly from authorized distributors.' },
  { icon: Truck,      title: 'Fast Delivery',  desc: 'We deliver across all of Pakistan within 1–3 business days.' },
  { icon: Headphones, title: '24/7 Support',   desc: 'Our team is available around the clock via WhatsApp or phone.' },
  { icon: RotateCcw,  title: '7-Day Returns',  desc: 'Not satisfied? Return any product within 7 days — no questions asked.' },
];

const HIGHLIGHTS = [
  { icon: Users,   label: 'Trusted by 10,000+', sub: 'customers nationwide' },
  { icon: Award,   label: 'Authorized Dealer',  sub: 'for top brands'       },
  { icon: Star,    label: '4.9 Star Rating',    sub: 'from real reviews'    },
  { icon: Package, label: '500+ Products',      sub: 'across all categories'},
];

const AboutUs = () => {
  useEffect(() => { document.title = 'About Us — E-Tech'; }, []);

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <div className="bg-[#003791]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="text-blue-300 text-xs flex items-center gap-2 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">About Us</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">About E-Tech</h1>
            <p className="text-blue-200 text-sm max-w-xl leading-relaxed">
              Pakistan's trusted gaming store — PlayStation, Xbox, Controllers, Headsets & accessories. 100% original. Cash on Delivery everywhere.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-center py-8 px-4"
              >
                <p className="text-3xl sm:text-4xl font-black text-[#003791] mb-1">{stat.value}</p>
                <p className="text-gray-500 text-xs font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mission Section */}
        <div className="py-16 border-b border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[#003791] text-xs font-black tracking-widest uppercase mb-3 block">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight mb-5 leading-tight">
                Bringing World-Class<br />Gaming Gear to Pakistan
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                E-Tech was founded with one goal — give every Pakistani gamer access to premium, authentic gaming equipment at fair prices. From PlayStation to Xbox, from headsets to networking gear, we carry it all.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                We partner directly with authorized distributors to eliminate counterfeits and pass savings to our customers. Lahore, Karachi, Islamabad, Peshawar — we deliver everywhere in Pakistan.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#003791] hover:bg-[#002a6e] text-white font-black px-6 py-3.5 rounded-full text-sm transition-colors"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {HIGHLIGHTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-[#f8f8f8] rounded-2xl p-5 border border-gray-100">
                    <div className="w-10 h-10 bg-[#003791]/10 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#003791]" />
                    </div>
                    <p className="text-[#1a1a1a] font-black text-sm mb-0.5">{item.label}</p>
                    <p className="text-gray-400 text-xs">{item.sub}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Values */}
        <div className="py-16 border-b border-gray-100">
          <div className="text-center mb-10">
            <span className="text-[#003791] text-xs font-black tracking-widest uppercase mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl font-black text-[#1a1a1a] tracking-tight">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#003791]/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#003791]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#003791]" />
                  </div>
                  <h3 className="text-[#1a1a1a] font-black text-sm mb-2">{val.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="py-16">
          <div className="bg-[#003791] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#00d4ff] blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">Ready to Level Up?</h2>
              <p className="text-blue-200 text-sm mb-8 max-w-md mx-auto">
                Shop Pakistan's best gaming store — 100% original products, Cash on Delivery, 24/7 support.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/shop" className="bg-white text-[#003791] font-black px-8 py-3.5 rounded-full hover:bg-blue-50 transition-colors text-sm">
                  Shop Now
                </Link>
                <Link to="/contact" className="border-2 border-white/40 text-white font-black px-8 py-3.5 rounded-full hover:border-white transition-colors text-sm">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

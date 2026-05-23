import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const FinalCTA = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1a1a1a] rounded-3xl overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#003791] blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#107C10] blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-10 sm:p-14">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-3">Pakistan's Premier Gaming Store</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Authentic Gear.<br />
                <span className="text-[#00d4ff]">Delivered to Your Door.</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                PlayStation, Xbox, Controllers, Headsets and more — 100% original products with Cash on Delivery across Pakistan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-48">
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 bg-[#003791] hover:bg-[#002a6e] text-white font-black px-8 py-4 rounded-full transition-colors text-sm"
              >
                Browse Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/923041109928?text=Hi%2C%20I%20want%20to%20order`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black px-8 py-4 rounded-full transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
                Order via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA

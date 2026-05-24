import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400">

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/ChatGPT_Image_May_23__2026__05_13_43_PM-removebg-preview.png"
                alt="E-Tech Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed mb-5">
              Pakistan's trusted gaming store. PlayStation, Xbox, Controllers, Headsets & accessories — 100% original with Cash on Delivery.
            </p>
            <div className="flex items-center gap-2">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#003791] flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a href={`https://wa.me/923041109928`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] flex items-center justify-center text-[#25D366] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { id: 'controller', label: 'PlayStation' },
                { id: 'controller', label: 'Xbox' },
                { id: 'controller', label: 'Controllers' },
                { id: 'headset', label: 'Headsets' },
                { id: 'keyboard', label: 'Keyboards' },
                { id: 'mouse', label: 'Mouse' },
                { id: 'accessories', label: 'Networking' },
              ].map((c, i) => (
                <li key={i}>
                  <Link to={`/shop?category=${c.id}`} className="text-gray-500 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-wider mb-4">Help</h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { to: '/dashboard', label: 'Track Order' },
                { to: '/contact', label: 'Returns & Refunds' },
                { to: '/contact', label: 'Shipping Policy' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact Us' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#003791] flex-shrink-0" />
                <span>+92 304 1109928</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#003791] flex-shrink-0" />
                <span>support@techgear.pk</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#003791] flex-shrink-0" />
                <span>Pakistan</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-[#003791]/20 rounded-xl border border-[#003791]/30">
              <p className="text-white font-black text-sm mb-1">Order via WhatsApp</p>
              <p className="text-gray-400 text-xs mb-3">Instant response — Cash on Delivery available</p>
              <a
                href="https://wa.me/923041109928?text=Hi%2C%20I%20want%20to%20order"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs py-2 px-4 rounded-lg transition-colors w-full"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#111]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">© 2026 E-Tech. All Rights Reserved. Pakistan 🇵🇰</p>
          <div className="flex items-center gap-2">
            {[
              { label: 'COD', bg: '#003791' },
              { label: 'Easypaisa', bg: '#00A651' },
              { label: 'JazzCash', bg: '#E01E2B' },
            ].map((m) => (
              <div key={m.label} className="h-6 px-2.5 rounded text-[9px] font-black text-white flex items-center" style={{ backgroundColor: m.bg }}>
                {m.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

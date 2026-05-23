import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '923041109928';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => { document.title = 'Contact Us — E-Tech'; }, []);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const msg = `*Contact Form — E-Tech*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A*Phone:* ${encodeURIComponent(form.phone)}%0A*Subject:* ${encodeURIComponent(form.subject)}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
      setSending(false);
      setSubmitted(true);
    }, 600);
  };

  const INFO = [
    { icon: Phone, title: 'Phone / WhatsApp', lines: ['+92 304 1109928'], href: `tel:+923041109928`, cta: 'Call Now' },
    { icon: Mail,  title: 'Email',            lines: ['support@techgear.pk'], href: 'mailto:support@techgear.pk', cta: 'Send Email' },
    { icon: MapPin, title: 'Location',        lines: ['Pakistan'] },
    { icon: Clock,  title: 'Support Hours',   lines: ['24 / 7 — Every Day'] },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <div className="bg-[#003791]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-blue-300 text-xs flex items-center gap-2 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Contact</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">Contact Us</h1>
          <p className="text-blue-200 text-sm max-w-md">Have a question about an order or product? We're here 24/7.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left — Info */}
          <div className="lg:col-span-2 space-y-4">

            {/* WhatsApp — prominent */}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20need%20help`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 bg-[#25D366] rounded-2xl p-5 hover:bg-[#1ebe5d] transition-colors"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-black text-sm">WhatsApp Support</p>
                <p className="text-white/80 text-xs mt-0.5">Fastest response — chat now →</p>
              </div>
            </motion.a>

            {/* Info Cards */}
            {INFO.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.08 }}
                  className="flex items-start gap-4 bg-[#f8f8f8] rounded-2xl p-5 border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#003791]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#003791]" />
                  </div>
                  <div>
                    <p className="text-[#1a1a1a] font-black text-sm mb-1">{item.title}</p>
                    {item.lines.map(l => <p key={l} className="text-gray-500 text-xs">{l}</p>)}
                    {item.href && item.cta && (
                      <a href={item.href} className="text-[#003791] text-xs font-bold mt-1.5 block hover:underline">{item.cta} →</a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-[#1a1a1a] font-black text-xl mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-xs">We'll get back to you via WhatsApp shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                    className="bg-[#003791] hover:bg-[#002a6e] text-white font-bold px-6 py-3 rounded-full text-sm transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-[#1a1a1a] font-black text-xl mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Full Name *</label>
                        <input name="name" type="text" required value={form.name} onChange={handleChange}
                          placeholder="Muhammad Ali"
                          className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#003791]/50 transition-colors" />
                      </div>
                      <div>
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Email *</label>
                        <input name="email" type="email" required value={form.email} onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#003791]/50 transition-colors" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Phone</label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                          placeholder="03XXXXXXXXX"
                          className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#003791]/50 transition-colors" />
                      </div>
                      <div>
                        <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Subject *</label>
                        <select name="subject" required value={form.subject} onChange={handleChange}
                          className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#003791]/50 transition-colors">
                          <option value="" disabled>Select subject</option>
                          <option>Order Inquiry</option>
                          <option>Product Question</option>
                          <option>Return & Refund</option>
                          <option>Technical Support</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Message *</label>
                      <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                        placeholder="How can we help you?"
                        className="w-full bg-[#f8f8f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#003791]/50 transition-colors resize-none" />
                    </div>
                    <button type="submit" disabled={sending}
                      className="w-full flex items-center justify-center gap-2 bg-[#003791] hover:bg-[#002a6e] text-white font-black py-3.5 rounded-full transition-colors text-sm disabled:opacity-60">
                      {sending ? 'Sending...' : <><Send className="w-4 h-4" /> Send via WhatsApp</>}
                    </button>
                    <p className="text-gray-400 text-xs text-center">Your message will be sent to our WhatsApp for fastest response.</p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

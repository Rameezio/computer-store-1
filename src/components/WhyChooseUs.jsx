import React from 'react';
import { Truck, Zap, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Cash on Delivery', desc: 'All over Pakistan' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Under 3-5 days' },
  { icon: ShieldCheck, title: '100% Original', desc: 'Genuine products' },
  { icon: RotateCcw, title: '7 Days Return', desc: 'Hassle-free policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always here for you' },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-4 flex-wrap lg:flex-nowrap">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="w-7 h-7 text-[#00d4ff] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="text-[#0f172a] font-bold text-sm mb-0.5">{title}</h4>
                <p className="text-gray-500 text-xs font-medium">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

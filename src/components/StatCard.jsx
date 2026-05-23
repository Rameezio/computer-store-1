import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'blue' }) => {
  const colors = {
    blue: 'from-[#0055ff] to-[#0044cc]',
    purple: 'from-[#b829dd] to-[#961eb8]',
    green: 'from-[#25D366] to-[#1da851]',
    orange: 'from-[#f97316] to-[#ea580c]'
  };

  const bgColors = {
    blue: 'bg-blue-500/20',
    purple: 'bg-purple-500/20',
    green: 'bg-green-500/20',
    orange: 'bg-orange-500/20'
  };

  const textColors = {
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    green: 'text-green-500',
    orange: 'text-orange-500'
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${bgColors[color]} flex items-center justify-center shadow-sm`}>
          <Icon className={`w-6 h-6 ${textColors[color]}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            <span>{trend === 'up' ? '↑' : '↓'}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{title}</h3>
      <p className="text-3xl font-black text-[#0f172a]">{value}</p>
    </div>
  );
};

export default StatCard;

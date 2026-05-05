import React from 'react';

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="group relative flex items-center gap-5 bg-white p-5 rounded-[24px] 
                    border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                    hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] 
                    hover:-translate-y-1 transition-all duration-300 ease-out 
                    overflow-hidden hover:bg-gray-100">
      
      {/* 1. Background Decorative Glow */}

        <div
  className={`
    absolute -right-4 -top-4 w-24 h-24 rounded-full 
    bg-gradient-to-br ${color}
    opacity-0 group-hover:opacity-[0.15]
    scale-100 group-hover:scale-110
    transition-all duration-500
  `}
/>

      {/* 2. Enhanced Icon Container */}
      <div className={`relative flex-shrink-0 w-14 h-14 flex items-center justify-center 
                      text-2xl text-white ${color} rounded-2xl
                      shadow-lg shadow-${color.split('-')[1]}-200/50
                      group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
        {/* Subtle Inner Glass Reflection */}
        
      <div className={`
    absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 opacity-0
    group-hover:opacity-40 ${color}
  `} />

  {/* Inner Gloss Reflection */}
  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 to-${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}/>
  
  {/* The Icon */}
  <span className="relative z-10 drop-shadow-sm group-hover:drop-shadow-md transition-all">
    {icon}
  </span>
</div>

      {/* 3. Text Layout */}
      <div className="flex flex-col">
        <span className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
          {label}
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-medium text-slate-800 tracking-tight">
            ${value}
          </span>
        </div>
      </div>

      {/* 4. Bottom Accent Bar */}
      <div className={`absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 ${color}`} />
    </div>
  );
};

export default InfoCard;
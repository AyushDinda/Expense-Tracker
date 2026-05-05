import React from 'react';
import { HiMenuAlt2 } from 'react-icons/hi';

const Navbar = ({ activeMenu, toggleMobileMenu }) => {
  return (
    <header className="h-[61px] bg-white border-b border-slate-200 sticky top-0 z-[100] px-4 lg:px-6 flex items-center justify-between">
      
      <div className="flex items-center gap-4 flex-1">
        {/* MOBILE MENU BUTTON - Hidden on large screens */}
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg min-[1081px]:hidden transition-colors"
          aria-label="Toggle Menu"
        >
          <HiMenuAlt2 size={24} />
        </button>

        {/* LOGO / BRAND */}
        <div className="group flex items-center gap-3 cursor-pointer select-none shrink-0">
          <div className="relative">
            {/* Animated Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-600 via-purple-500 to-fuchsia-500 rounded-[14px] blur-md opacity-20 group-hover:opacity-100 group-hover:blur-lg transition-all duration-700 ease-in-out"></div>
            
            {/* Main Logo Icon */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-slate-950 rounded-[14px] flex items-center justify-center border border-slate-800 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
              
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 z-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[10deg]" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
              </svg>
            </div>
          </div>

          {/* Brand Text */}
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline gap-0.5">
              <span className="font-black text-slate-900 text-lg sm:text-2xl tracking-tighter">
                EXPENSE
              </span>
              <span className="hidden sm:inline font-light text-slate-400 text-2xl tracking-tighter">
                /
              </span>
              <span className="font-extrabold text-lg sm:text-2xl tracking-tighter bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                TRACKER
              </span>
            </div>
            <span className="hidden md:block text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase mt-1 pl-0.5">
              Your Own Money Manager
            </span>
          </div>
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="hidden min-[1081px]:block w-[1px] h-6 bg-slate-200 mx-2"></div>

        {/* ACTIVE PAGE TITLE */}
        <h2 className="hidden min-[1081px]:block text-slate-500 font-medium text-sm">
          {activeMenu}
        </h2>
      </div>
    </header>
  );
};

export default Navbar;
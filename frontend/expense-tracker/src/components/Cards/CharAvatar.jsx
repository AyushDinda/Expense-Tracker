// import React, { useMemo } from 'react';
// import { getInitials } from '../../utils/helper';

// const CharAvatar = ({ fullName, width, height, style }) => {
//   // 1. Logic to give different users different colors
//   const avatarTheme = useMemo(() => {
//     const themes = [
//       { bg: '#4f46e5', glow: 'rgba(79, 70, 229, 0.4)' }, // Indigo
//       { bg: '#0891b2', glow: 'rgba(8, 145, 178, 0.4)' }, // Cyan
//       { bg: '#7c3aed', glow: 'rgba(124, 58, 237, 0.4)' }, // Violet
//       { bg: '#db2777', glow: 'rgba(219, 39, 119, 0.4)' }, // Pink
//       { bg: '#059669', glow: 'rgba(5, 150, 105, 0.4)' }, // Emerald
//       { bg: '#ea580c', glow: 'rgba(234, 88, 12, 0.4)' }, // Orange
//     ];
//     const name = fullName || "Guest";
//     const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
//     return themes[index % themes.length];
//   }, [fullName]);

//   return (
//     <div
//       style={{ 
//         backgroundColor: avatarTheme.bg,
//         boxShadow: `0 10px 15px -3px ${avatarTheme.glow}, 0 4px 6px -4px ${avatarTheme.glow}`,
//       }}
//       className={`
//         relative overflow-hidden group
//         ${width || 'w-12'} 
//         ${height || 'h-12'} 
//         ${style || 'text-sm'} 
//         flex items-center justify-center 
//         rounded-full 
//         text-white uppercase font-bold
//         border border-white/30
//         transition-all duration-300 ease-in-out
//         hover:scale-106 active:scale-95
//         cursor-default select-none
//       `}
//     >
//       {/* 2. Glassmorphism Gloss Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/30 pointer-events-none" />

//       {/* 3. Subtle Inner Bevel (Makes it look 3D) */}
//       <div className="absolute inset-[1px] rounded-full border-t border-white/40 border-l border-white/20 pointer-events-none" />

//       {/* 4. The Content */}
//       <span className="relative z-10 drop-shadow-md tracking-tight">
//         {getInitials(fullName || "Guest")}
//       </span>

//       {/* 5. Custom Shine Animation (CSS-in-JS fallback for tailwind.config) */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes custom-shine {
//           0% { transform: translateX(-200%) skewX(-15deg); }
//           100% { transform: translateX(200%) skewX(-15deg); }
//         }
//         .group:hover .shine-effect {
//           animation: custom-shine 0.7s ease-in-out forwards;
//         }
//       `}} />
//       <div className="shine-effect absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" 
//            style={{ transform: 'translateX(-200%) skewX(-15deg)' }} 
//       />
//     </div>
//   );
// };

// export default CharAvatar;

import React, { useMemo } from 'react';
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ fullName, width, height, style }) => {
  const avatarTheme = useMemo(() => {
    const themes = [
      { bg: '#4f46e5', glow: 'rgba(79, 70, 229, 0.4)' },
      { bg: '#0891b2', glow: 'rgba(8, 145, 178, 0.4)' },
      { bg: '#7c3aed', glow: 'rgba(124, 58, 237, 0.4)' },
      { bg: '#db2777', glow: 'rgba(219, 39, 119, 0.4)' },
      { bg: '#059669', glow: 'rgba(5, 150, 105, 0.4)' },
      { bg: '#ea580c', glow: 'rgba(234, 88, 12, 0.4)' },
    ];
    const name = fullName || "Guest";
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return themes[index % themes.length];
  }, [fullName]);

  return (
    <div
      style={{ 
        backgroundColor: avatarTheme.bg,
        boxShadow: `0 10px 15px -3px ${avatarTheme.glow}, 0 4px 6px -4px ${avatarTheme.glow}`,
      }}
      className={`
        relative overflow-hidden group
        ${width || 'w-12'} 
        ${height || 'h-12'} 
        ${style || 'text-sm'} 
        flex items-center justify-center 
        rounded-full 
        text-white uppercase font-bold
        border border-white/30
        transition-all duration-300 ease-in-out
        hover:scale-106 active:scale-95
        cursor-default select-none
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/30 pointer-events-none" />
      <div className="absolute inset-[1px] rounded-full border-t border-white/40 border-l border-white/20 pointer-events-none" />

      <span className="relative z-10 drop-shadow-md tracking-tight">
        {getInitials(fullName || "Guest")}
      </span>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes custom-shine {
          0% { transform: translateX(-200%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .group:hover .shine-effect {
          animation: custom-shine 0.7s ease-in-out forwards;
        }
      `}} />

      <div className="shine-effect absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" 
           style={{ transform: 'translateX(-200%) skewX(-15deg)' }} 
      />
    </div>
  );
};

export default CharAvatar;
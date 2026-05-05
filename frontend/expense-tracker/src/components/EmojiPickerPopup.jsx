// import React, { useState, useRef, useEffect } from 'react';
// import { LuImage, LuX } from 'react-icons/lu';
// import EmojiPicker from "emoji-picker-react";

// const EmojiPickerPopup = ({ icon, onSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pickerRef = useRef(null);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleEmojiSelect = (emoji) => {
//     onSelect(emoji?.imageUrl || "");
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative">
      
//       {/* Trigger */}
//       <div
//         className='flex flex-col items-center gap-2 cursor-pointer group'
//         onClick={() => setIsOpen(true)}
//       >
//         <div className={`w-16 h-16 flex items-center justify-center rounded-2xl border-2 border-dashed transition-all
//           ${icon ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300 group-hover:border-blue-400 bg-gray-50'}
//         `}>
//           {icon ? (
//             <img src={icon} alt="Icon" className='w-10 h-10 object-contain' />
//           ) : (
//             <LuImage className="text-gray-400 text-2xl group-hover:text-blue-500" />
//           )}
//         </div>

//         <p className='text-[10px] font-semibold uppercase tracking-wider text-gray-500'>
//           {icon ? "Change" : "Add Icon"}
//         </p>
//       </div>

//       {/* CENTERED MODAL */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          
//           {/* Modal Card */}
//           <div
//             ref={pickerRef}
//             className="relative bg-white rounded-2xl shadow-2xl border w-[95%] max-w-sm animate-in fade-in zoom-in-95 duration-200"
//           >
//             {/* Header */}
//             <div className='flex items-center justify-between p-3 border-b'>
//               <span className='text-sm font-semibold text-gray-700'>
//                 Select Emoji
//               </span>
//               <button
//                 className='p-1.5 text-black hover:text-red-600 rounded-lg'
//                 onClick={() => setIsOpen(false)}
//               >
//                 <LuX />
//               </button>
//             </div>

//             {/* Picker */}
//             <div className="p-2">
//               <EmojiPicker
//                 onEmojiClick={handleEmojiSelect}
//                 width="100%"
//                 height={350}
//                 searchPlaceHolder="Search icon..."
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmojiPickerPopup;

// import React, { useState, useRef, useEffect } from "react";
// import { LuImage, LuX } from "react-icons/lu";
// import EmojiPicker from "emoji-picker-react";

// const EmojiPickerPopup = ({ icon, onSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pickerRef = useRef(null);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleEmojiSelect = (emoji) => {
//     onSelect(emoji?.imageUrl || "");
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative">
      
//       {/* ===== Trigger UI (Dashed Box Style) ===== */}
//       <div
//         onClick={() => setIsOpen(true)}
//         className="flex flex-col items-center gap-2 cursor-pointer group"
//       >
//         <div
//           className={`w-20 h-20 flex items-center justify-center rounded-xl border-2 border-dashed transition-all
//           ${
//             icon
//               ? "border-blue-500 bg-blue-50/40 shadow-sm"
//               : "border-gray-300 hover:border-blue-400 bg-gray-50"
//           }`}
//         >
//           {icon ? (
//             <img
//               src={icon}
//               alt="icon"
//               className="w-10 h-10 object-contain"
//             />
//           ) : (
//             <LuImage className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
//           )}
//         </div>

//         <p className="text-xs text-gray-500">
//           {icon ? "Change Icon" : "Add Icon"}
//         </p>
//       </div>

//       {/* ===== Centered Modal Picker ===== */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          
//           <div
//             ref={pickerRef}
//             className="relative bg-white rounded-2xl shadow-2xl border w-[95%] max-w-sm animate-in fade-in zoom-in-95 duration-200"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-3 border-b">
//               <span className="text-sm font-semibold text-gray-700">
//                 Select Emoji
//               </span>

//               <button
//                 className="p-1.5 text-black hover:text-red-600 rounded-lg"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <LuX />
//               </button>
//             </div>

//             {/* Picker */}
//             <div className="p-2">
//               <EmojiPicker
//                 onEmojiClick={handleEmojiSelect}
//                 width="100%"
//                 height={350}
//                 searchPlaceHolder="Search icon..."
//               />
//             </div>
//           </div>

//         </div>
//       )}
//     </div>
//   );
// };

// export default EmojiPickerPopup;

import React, { useState, useRef, useEffect } from "react";
import { LuImage, LuX } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiSelect = (emoji) => {
    // 🔥 FIX: support emoji + image
    onSelect(emoji?.emoji || emoji?.imageUrl || "");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center gap-2 cursor-pointer group"
      >
        <div
          className={`w-20 h-20 flex items-center justify-center rounded-xl border-2 border-dashed transition-all
          ${
            icon
              ? "border-blue-500 bg-blue-50/40 shadow-sm"
              : "border-gray-300 hover:border-blue-400 bg-gray-50"
          }`}
        >
          {/* 🔥 FIXED RENDER */}
          {icon ? (
            icon.startsWith("http") ? (
              <img src={icon} alt="icon" className="w-10 h-10 object-contain" />
            ) : (
              <span className="text-3xl">{icon}</span>
            )
          ) : (
            <LuImage className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
          )}
        </div>

        <p className="text-xs text-gray-500">
          {icon ? "Change Icon" : "Add Icon"}
        </p>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          
          <div
            ref={pickerRef}
            className="bg-white rounded-2xl shadow-2xl border w-[95%] max-w-sm"
          >
            <div className="flex justify-between p-3 border-b">
              <span className="text-sm font-semibold">Select Icon</span>
              <button onClick={() => setIsOpen(false)}>
                <LuX />
              </button>
            </div>

            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              width="100%"
              height={350}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
// import React, { useEffect } from "react";
// import { GiTireIronCross } from "react-icons/gi";

// const Modal = ({ children, isOpen, onClose, title }) => {
//   // Handle Escape key and Scroll Lock
//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.key === "Escape") onClose();
//     };
    
//     if (isOpen) {
//       window.addEventListener("keydown", handleEsc);
//       document.body.style.overflow = "hidden";
//     }

//     return () => {
//       window.removeEventListener("keydown", handleEsc);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex justify-center items-center w-full h-full p-4 bg-slate-950/60 backdrop-blur-md"
//       onClick={onClose}
//     >
//       <div 
//         className="relative w-full max-w-2xl max-h-full"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Modal Container */}
//         <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
          
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
//             <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
//               {title}
//             </h3>
//             <button
//               type="button"
//               className="group p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
//               onClick={onClose}
//             >
//               <GiTireIronCross className="w-4 h-4 cursor-pointer" />
//             </button>
//           </div>

//           {/* Modal Body */}
//           <div className="p-6 overflow-y-auto text-gray-600 dark:text-gray-300 leading-relaxed">
//             {children}
//           </div>         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React, { useEffect } from "react";
import { GiTireIronCross } from "react-icons/gi";

const Modal = ({ children, isOpen, onClose, title }) => {

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex justify-center items-center w-full h-full p-4 bg-slate-950/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Container (UNCHANGED UI) */}
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
          
          {/* Header (UNCHANGED) */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              {title}
            </h3>
            <button
              type="button"
              className="group p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
              onClick={onClose}
            >
              <GiTireIronCross className="w-4 h-4 cursor-pointer" />
            </button>
          </div>

          {/* Body (UNCHANGED UI, only safe scroll) */}
          <div className="p-6 overflow-y-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            {children}
          </div>         
        </div>
      </div>
    </div>
  );
};

export default Modal;
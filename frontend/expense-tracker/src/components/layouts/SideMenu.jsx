// import React, { useContext } from 'react';
// import { UserContext } from '../../context/UserContext';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { SIDE_MENU_DATA } from '../../utils/data';
// import { HiOutlineLogout, HiX } from 'react-icons/hi';
// import CharAvatar from '../Cards/CharAvatar';
// import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector'; // ✅ added

// const SideMenu = ({ isOpen, setIsOpen }) => {
//   const { user, clearUser, updateUser } = useContext(UserContext); // ✅ added updateUser
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.clear();
//     clearUser();
//     navigate("/login");
//   };

//   const handleClick = (route) => {
//     navigate(route);
//     if (setIsOpen) setIsOpen(false);
//   };

//   return (
//     <>
//       {/* MOBILE OVERLAY */}
//       <div 
//         className={`fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
//           isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         onClick={() => setIsOpen(false)}
//       />

//       {/* SIDEBAR */}
//       <div className={`
//         fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 p-4 flex flex-col 
//         transition-transform duration-300 ease-in-out

//         ${isOpen ? "translate-x-0" : "-translate-x-full"}

//         lg:translate-x-0
//         lg:static
//         lg:top-[61px]
//         lg:h-[calc(100vh-61px)]
//         lg:bg-slate-50/50
//       `}>
        
//         {/* Close Button (mobile only) */}
//         <div className="flex justify-end lg:hidden mb-2">
//           <button 
//             onClick={() => setIsOpen(false)}
//             className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
//           >
//             <HiX size={24} />
//           </button>
//         </div>

//         {/* USER PROFILE CARD */}
//         <div className="flex flex-col items-center py-6 mb-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          
//           {/* 🔥 REPLACED IMAGE BLOCK */}
//           <div className="relative">
//             <ProfilePhotoSelector
//               image={user?.profileImageUrl}
//               setImage={(url) =>
//                 updateUser({
//                   ...user,
//                   profileImageUrl: url,
//                 })
//               }
//             />

//             <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
//           </div>

//           <div className="mt-3 text-center px-4">
//             <h5 className="font-semibold text-slate-800 text-sm leading-tight truncate w-full">
//               {user?.fullName || "User Name"}
//             </h5>
//             <p className="text-xs text-slate-500 mt-1 truncate w-full">
//               {user?.email || "View Profile"}
//             </p>
//           </div>
//         </div>

//         {/* NAVIGATION */}
//         <nav className="flex-1 space-y-1 overflow-y-auto">
//           {SIDE_MENU_DATA.map((item, index) => {
//             const isActive = location.pathname === item.path; 

//             return (
//               <button
//                 key={`menu_${index}`}
//                 className={`w-full group flex items-center justify-between py-2.5 cursor-pointer px-4 rounded-xl transition-all duration-200 ${
//                   isActive 
//                     ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
//                     : "text-slate-600 hover:bg-indigo-100 hover:text-gray-500 hover:shadow-sm"
//                 }`}
//                 onClick={() => handleClick(item.path)}
//               >
//                 <div className="flex items-center gap-3">
//                   <item.icon className={`text-xl ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500 group-hover:text-lg"}`} />
//                   <span className="font-medium text-[14px]">{item.label}</span>
//                 </div>
                
//                 {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
//               </button>
//             );
//           })}
//         </nav>

//         {/* LOGOUT */}
//         <div className="mt-auto pt-4 border-t border-slate-200">
//           <button
//             onClick={handleLogout}
//             className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-300/50 rounded-xl transition-colors"
//           >
//             <HiOutlineLogout className="text-xl" />
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideMenu;

import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import { HiOutlineLogout, HiX } from 'react-icons/hi';
import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector';

const SideMenu = ({ isOpen, setIsOpen }) => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const handleClick = (route) => {
    navigate(route);
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div 
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 p-4 flex flex-col 
        transition-transform duration-300 ease-in-out

        /* Mobile State */
        ${isOpen ? "translate-x-0" : "-translate-x-full"}

        /* Desktop State - THE FIX IS HERE */
        lg:translate-x-0
        lg:sticky 
        lg:top-[61px] 
        lg:h-[calc(100vh-61px)] 
        lg:flex-shrink-0
        lg:bg-slate-50/50
      `}>
        
        {/* Close Button (mobile only) */}
        <div className="flex justify-end lg:hidden mb-2">
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* USER PROFILE CARD */}
        <div className="flex flex-col items-center py-6 mb-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="relative">
            <ProfilePhotoSelector
              image={user?.profileImageUrl}
              setImage={(url) =>
                updateUser({
                  ...user,
                  profileImageUrl: url,
                })
              }
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <div className="mt-3 text-center px-4 w-full">
            <h5 className="font-semibold text-slate-800 text-sm leading-tight truncate">
              {user?.fullName || "User Name"}
            </h5>
            <p className="text-xs text-slate-500 mt-1 truncate">
              {user?.email || "View Profile"}
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {SIDE_MENU_DATA.map((item, index) => {
            const isActive = location.pathname === item.path; 

            return (
              <button
                key={`menu_${index}`}
                className={`w-full group flex items-center justify-between py-2.5 cursor-pointer px-4 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                    : "text-slate-600 hover:bg-indigo-100 hover:text-gray-500 hover:shadow-sm"
                }`}
                onClick={() => handleClick(item.path)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`text-xl ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500 group-hover:text-lg"}`} />
                  <span className="font-medium text-[14px]">{item.label}</span>
                </div>
                
                {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </button>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="mt-auto pt-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-300/50 rounded-xl transition-colors"
          >
            <HiOutlineLogout className="text-xl" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
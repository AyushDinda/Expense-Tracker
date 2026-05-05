// import React, { useRef, useState, useContext } from "react";
// import { createPortal } from "react-dom";
// import { LuTrash2, LuEye, LuUpload } from "react-icons/lu";
// import uploadImage, { updateProfileImage } from "../../utils/uploadImage";
// import { UserContext } from "../../context/UserContext";
// import CharAvatar from "../Cards/CharAvatar"; // ✅ added

// const ProfilePhotoSelector = ({ image, setImage }) => {
//   const inputRef = useRef(null);
//   const { user, updateUser } = useContext(UserContext);

//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleClick = () => inputRef.current.click();

//   // 🔥 UPLOAD
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       setLoading(true);
//       const res = await uploadImage(file);
//       const updatedUser = await updateProfileImage(res.imageUrl);

//       setImage(updatedUser.user.profileImageUrl);
//       updateUser(updatedUser.user);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 REMOVE
//   const handleRemove = async () => {
//     try {
//       setLoading(true);
//       const updatedUser = await updateProfileImage(null);

//       setImage(updatedUser.user.profileImageUrl);
//       updateUser(updatedUser.user);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center mb-2">
//         <div className="relative w-16 h-16 lg:w-20 lg:h-20">

//           {/* IMAGE CONTAINER */}
//           <div className="w-full h-full rounded-full overflow-hidden border border-slate-200 relative">

//             {image ? (
//               <img
//                 src={image}
//                 alt="profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div
//                 onClick={handleClick}
//                 className="w-full h-full flex items-center justify-center cursor-pointer bg-gray-100"
//               >
//                 {/* 🔥 CHAR AVATAR HERE */}
//                 <CharAvatar
//                   fullName={user?.fullName}
//                   width="w-full"
//                   height="h-full"
//                   style="text-2xl"
//                 />
//               </div>
//             )}

//             {/* LOADER */}
//             {loading && (
//               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                 <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             )}
//           </div>

//           {/* ACTIONS */}
//           {!loading && (
//             <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center gap-1">

//               {image && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     document.body.style.overflow = "hidden";
//                     setPreviewOpen(true);
//                   }}
//                   className="bg-white p-1 rounded-full"
//                 >
//                   <LuEye size={12} />
//                 </button>
//               )}

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleClick();
//                 }}
//                 className="bg-white p-1 rounded-full"
//               >
//                 <LuUpload size={12} />
//               </button>

//               {image && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleRemove();
//                   }}
//                   className="bg-red-500 text-white p-1 rounded-full"
//                 >
//                   <LuTrash2 size={12} />
//                 </button>
//               )}
//             </div>
//           )}

//           {/* FILE INPUT */}
//           <input
//             type="file"
//             ref={inputRef}
//             onChange={handleImageChange}
//             accept="image/*"
//             className="hidden"
//           />
//         </div>
//       </div>

//       {/* FULLSCREEN PREVIEW */}
//       {previewOpen &&
//         image &&
//         createPortal(
//           <div
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-[99999]"
//             onClick={() => {
//               document.body.style.overflow = "auto";
//               setPreviewOpen(false);
//             }}
//           >
//             <img
//               src={image}
//               alt="preview"
//               className="max-w-[95%] max-h-[95%] object-contain rounded-lg shadow-xl"
//             />
//           </div>,
//           document.body
//         )}
//     </>
//   );
// };

// export default ProfilePhotoSelector;

import React, { useRef, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { LuTrash2, LuEye, LuUpload } from "react-icons/lu";
import uploadImage, { updateProfileImage } from "../../utils/uploadImage";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const { user, updateUser } = useContext(UserContext);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => inputRef.current.click();

  // 🔥 UPLOAD
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const res = await uploadImage(file);
      const updatedUser = await updateProfileImage(res.imageUrl);

      setImage(updatedUser.user.profileImageUrl);
      updateUser(updatedUser.user);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      // ✅ FIX: Reset the input value so the same file can be uploaded again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setLoading(false);
    }
  };

  // 🔥 REMOVE
  const handleRemove = async () => {
    try {
      setLoading(true);
      const updatedUser = await updateProfileImage(null);

      setImage(updatedUser.user.profileImageUrl);
      updateUser(updatedUser.user);
    } catch (err) {
      console.error("Remove failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to handle modal closing
  const closePreview = () => {
    document.body.style.overflow = "auto";
    setPreviewOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center mb-2">
        <div className="relative w-16 h-16 lg:w-20 lg:h-20">
          
          {/* IMAGE CONTAINER */}
          <div className="w-full h-full rounded-full overflow-hidden border border-slate-200 relative bg-gray-50">
            {image ? (
              <img
                src={image}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                onClick={handleClick}
                className="w-full h-full flex items-center justify-center cursor-pointer"
              >
                <CharAvatar
                  fullName={user?.fullName}
                  width="w-full"
                  height="h-full"
                  style="text-2xl"
                />
              </div>
            )}

            {/* LOADER */}
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          {!loading && (
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-1 z-20">
              {image && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.body.style.overflow = "hidden";
                    setPreviewOpen(true);
                  }}
                  className="bg-white p-1.5 rounded-full hover:bg-gray-100"
                  title="View Photo"
                >
                  <LuEye size={14} />
                </button>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="bg-white p-1.5 rounded-full hover:bg-gray-100"
                title="Upload Photo"
              >
                <LuUpload size={17} />
              </button>

              {image && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                  title="Remove Photo"
                >
                  <LuTrash2 size={14} />
                </button>
              )}
            </div>
          )}

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* FULLSCREEN PREVIEW */}
      {previewOpen &&
        image &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[99999] cursor-zoom-out"
            onClick={closePreview}
          >
            <button 
              className="absolute top-5 right-5 text-white text-3xl"
              onClick={closePreview}
            >
              &times;
            </button>
            <img
              src={image}
              alt="preview"
              className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default ProfilePhotoSelector;
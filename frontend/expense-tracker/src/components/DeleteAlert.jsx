import React, { useState } from 'react';
import { Trash2, AlertCircle, Loader2 } from 'lucide-react';

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Warning Header */}
      <div className="flex items-center gap-3 p-4 bg-red-200 border border-red-100 rounded-lg">
        <div className="p-2 bg-red-100 rounded-full">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <p className="text-sm text-red-800 font-medium">
          This action is permanent and cannot be undone.
        </p>
      </div>

      {/* Main Message */}
      <p className="text-black dark:text-gray-300 text-[15px] px-1">
        {content || "Are you sure you want to delete this record?"}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        {/* <button
          type="button"
          onClick={onCancel}
          disabled={isDeleting}
          className="px-4 py-2 cursor-pointer text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Keep it
        </button> */}

        <button
  type="button"
  disabled={isDeleting}
  onClick={handleDelete}
  className="relative overflow-hidden flex items-center cursor-pointer justify-center gap-2 px-5 py-2 text-sm font-semibold text-gray-100 bg-rose-600 rounded-lg hover:bg-red-700 hover:text-white active:scale-95 transition-all shadow-red-200 disabled:bg-red-400 group"
>
  {/* Shine Effect */}
  <span className="absolute inset-0 overflow-hidden rounded-lg">
    <span className="absolute -left-[75%] top-0 h-full w-1/2 bg-white/30 skew-x-[-20deg] group-hover:left-[125%] transition-all duration-700"></span>
  </span>

  {/* Content */}
  {isDeleting ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin relative z-10" />
      <span className="relative z-10">Deleting...</span>
    </>
  ) : (
    <>
      <Trash2 className="w-4 h-4 relative z-10" />
      <span className="relative z-10">Delete Permanently</span>
    </>
  )}
</button>
      </div>
    </div>
  );
};

export default DeleteAlert;
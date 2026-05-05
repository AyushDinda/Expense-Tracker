import React from 'react';
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuPiggyBank,
  LuPencil,
} from "react-icons/lu";
import { BsQuestionOctagon } from "react-icons/bs";


const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  onEdit
}) => {
  if (!title && !amount) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-40 py-20 bg-gray-50/50 rounded-xl col-span-full my-auto">
        <div className="p-4 mb-4">
          <BsQuestionOctagon className="text-gray-300 text-6xl"/>
        </div>
        <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">
          No Data Available
        </p>
        
        <p className="text-xs text-gray-400 mt-2 font-medium">
          Start by adding a new record to see it here.
        </p>
      </div>
    );
  }

  return (
      <div 
        className='group relative flex items-center justify-between gap-4 mt-2 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100'
        onClick={onEdit}
      >
      {/* LEFT SECTION */}
      <div className='flex items-center gap-4'>
        
        {/* ICON CONTAINER */}
        <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 rounded-full bg-white shadow-sm border border-gray-50'>
          {icon && icon.startsWith("http") ? (
            <img src={icon} alt={title} className="w-6 h-6" />
          ) : icon ? (
            <span className="text-xl">{icon}</span>
          ) : type === "income" ? (
            <LuPiggyBank className="text-green-500" />
          ) : (
            <LuUtensils className="text-gray-400" />
          )}
        </div>

        {/* TITLE + DATE */}
        <div>
          <p className='text-sm font-semibold text-gray-900 leading-tight'>{title}</p>
          <p className='text-[11px] text-gray-500 mt-0.5'>{date}</p>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className='flex items-center gap-3'>
        
        {/* AMOUNT BADGE */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm transition-all duration-200
          ${
            type === "income"
              ? "bg-green-50 text-green-700 border border-green-100"
              : "bg-red-50 text-red-700 border border-red-100"
          }`}
        >
          <span className="tracking-tight">
            {type === "income" ? "+" : "-"}${amount}
          </span>

          {/* TRENDING ICON BUBBLE */}
          <span
            className={`flex items-center justify-center w-5 h-5 rounded-full
            ${
              type === "income"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {type === "income" ? (
              <LuTrendingUp size={12} />
            ) : (
              <LuTrendingDown size={12} />
            )}
          </span>
        </div>

        {/* DELETE BUTTON (Hidden by default, shows on card hover) */}
        {onEdit && (
  <button
    className='opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-blue-50 rounded-full'
    onClick={(e) => {
      e.stopPropagation();
      onEdit();
    }}
  >
    <LuPencil className='text-gray-400 hover:text-blue-500' size={18} />
  </button>
)}
        {!hideDeleteBtn && (
          <button 
            className='opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full' 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click trigger
              onDelete();
            }}
          >
            <LuTrash2 className='text-gray-400 hover:text-red-500' size={18} />
          </button>
        )}

      </div>
    </div>
  );
};

export default TransactionInfoCard;
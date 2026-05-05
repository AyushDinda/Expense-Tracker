import React, { useEffect, useState } from "react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineTag,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome, editData }) => {
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
    category: "Salary",
    description: "",
  });

  const categories = [
    "Salary",
    "Freelance",
    "Investments",
    "Stocks",
    "Gift",
    "Other",
  ];

  useEffect(() => {
    if (editData) {
      setFormData({
        source: editData.source || "",
        amount: editData.amount || "",
        date: editData.date ? editData.date.split("T")[0] : "",
        icon: editData.icon || "💰",
        category: editData.category || "Salary",
        description: editData.description || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.source || !formData.amount || !formData.date) return;

    onAddIncome({
      ...formData,
      amount: parseFloat(formData.amount),
      _id: editData?._id,
    });

    // reset
    setFormData({
      source: "",
      amount: "",
      date: "",
      icon: "💰"||"💵",
      category: "Salary",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={formData.icon}
        onSelect={(icon) =>
          setFormData((prev) => ({ ...prev, icon }))
        }
      />

      {/* Source */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Income Source
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlinePencilAlt className="h-5 w-5 text-gray-400" />
          </div>
          <input
            required
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="e.g. Salary, Freelance"
            className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Amount + Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              required
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineCalendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Category
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineTag className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Add some notes..."
          className="block w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-[0.98]"
      >
        {editData ? "Update Income" : "Add Income"}
      </button>
    </form>
  );
};

export default AddIncomeForm;
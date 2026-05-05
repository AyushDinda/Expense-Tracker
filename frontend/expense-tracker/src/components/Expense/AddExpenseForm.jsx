import React, { useEffect, useState } from "react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineTag,
} from "react-icons/hi";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense, editData }) => {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
    description: "",
  });

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
  ];

  useEffect(() => {
    if (editData) {
      setFormData({
        category: editData.category || "",
        amount: editData.amount || "",
        date: editData.date ? editData.date.split("T")[0] : "",
        icon: editData.icon || "💸",
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

    if (!formData.category.trim()) return;
    if (!formData.amount || Number(formData.amount) <= 0) return;
    if (!formData.date) return;

    onAddExpense({
      ...formData,
      amount: parseFloat(formData.amount),
      _id: editData?._id,
    });

    // reset
    if (!editData) {
      setFormData({
        category: "",
        amount: "",
        date: "",
        icon: "💸",
        description: "",
      });
    }
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

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Category
        </label>

        <div className="relative">
          <HiOutlineTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <select
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
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
            <HiOutlineCurrencyDollar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Date
          </label>

          <div className="relative">
            <HiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
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
          placeholder="Add note..."
          className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-[0.98]"
      >
        {editData ? "Update Expense" : "Add Expense"}
      </button>

    </form>
  );
};

export default AddExpenseForm;
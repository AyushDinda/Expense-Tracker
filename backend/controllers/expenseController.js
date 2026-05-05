const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// ➕ Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: date ? new Date(date) : new Date(),
    });

    await newExpense.save();

    res.status(200).json({
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding expense",
      error: error.message,
    });
  }
};

// 📥 Get All Expenses
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ❌ Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// 📊 Download Expense Excel (FIXED FOR DEPLOYMENT)
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // 🔥 FIX: buffer instead of file
    const buffer = xlsx.write(wb, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { icon, category, amount, date } = req.body;

    if (!amount || !category) {
      return res.status(400).json({
        message: "Category and amount are required",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        icon,
        category,
        amount,
        date: date ? new Date(date) : new Date(),
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating expense",
      error: error.message,
    });
  }
};
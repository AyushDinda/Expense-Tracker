const xlsx = require("xlsx");
const Income = require("../models/Income");

// ADD
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: date ? new Date(date) : new Date(),
    });

    await newIncome.save();

    res.status(201).json({
      message: "Income added",
      income: newIncome,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET
exports.getAllIncome = async (req, res) => {
  const income = await Income.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(income);
};

// DELETE
exports.deleteIncome = async (req, res) => {
  await Income.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// UPDATE
exports.updateIncome = async (req, res) => {
  const updated = await Income.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ message: "Updated", income: updated });
};

// DOWNLOAD
exports.downloadIncomeExcel = async (req, res) => {
  const income = await Income.find({ userId: req.user.id });

  const data = income.map((i) => ({
    Source: i.source,
    Amount: i.amount,
    Date: i.date.toISOString().split("T")[0],
  }));

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, ws, "Income");

  const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=income.xlsx"
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.send(buffer);
};
// const Income = require("../models/Income");
// const Expense = require("../models/Expense");
// const { isValidObjectId, Types } = require("mongoose");

// // Dashboard Data
// exports.getDashboardData = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const userObjectId = new Types.ObjectId(String(userId));

//         // Fetch total income & expenses
//         const totalIncome = await Income.aggregate([
//             { $match: { userId: userObjectId } },
//             { $group: { _id: null, total: { $sum: "$amount" } } },
//         ]);

//         console.log("totalIncome:", {totalIncome, userId: isValidObjectId(userId)});

//         const totalExpense = await Expense.aggregate([
//             { $match: { userId: userObjectId } },
//             { $group: { _id: null, total: { $sum: "$amount" } } },
//         ]);

//         const last60DaysIncomeTranscations = await Income.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
//         }).sort({ date: -1 });

//         const incomeLast60Days = last60DaysIncomeTranscations.reduce(
//             (sum, transaction) => sum + transaction.amount,
//             0
//         );

//         const last60DaysExpenseTransactions = await Expense.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
//         }).sort({ date: -1 });

//         const expenseLast60Days = last60DaysExpenseTransactions.reduce(
//             (sum, transaction) => sum + transaction.amount,
//             0
//         );

//         res.json({
//             totalIncome: totalIncome[0]?.total || 0,
//             totalExpense: totalExpense[0]?.total || 0,
//             incomeLast60Days,
//             expenseLast60Days
//         });

//         const last30DaysExpenseTransactions = await Expense.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
//         }).sort({ date: -1 });

//         const expenseLast30Days = last30DaysExpenseTransactions.reduce(
//             (sum, transaction) => sum + transaction.amount,
//             0
//         );

//         const lastTranscations = [
//             ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
//                 (txn) => ({ ...txn.toObject(), type: "income" })
//             ),
//             ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
//                 (txn) => ({ ...txn.toObject(), type: "expense" })
//             ),
//         ].sort((a, b) => b.date - a.date);


//         res.json({
//     totalBalance:
//         (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

//     totalIncome: totalIncome[0]?.total || 0,
//     totalExpenses: totalExpense[0]?.total || 0,

//     last30DaysExpenses: {
//         total: expensesLast30Days,
//         transactions: last30DaysExpenseTransactions,
//     },

//     last60DaysIncome: {
//         total: incomeLast60Days,
//         transactions: last60DaysIncomeTransactions,
//     },

//     recentTransactions: lastTransactions,
// });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // ------------------ TOTAL INCOME ------------------
        const totalIncomeResult = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalIncome = totalIncomeResult[0]?.total || 0;

        // ------------------ TOTAL EXPENSE ------------------
        const totalExpenseResult = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalExpense = totalExpenseResult[0]?.total || 0;

        // ------------------ LAST 60 DAYS INCOME ------------------
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // ------------------ LAST 60 DAYS EXPENSE ------------------
        const last60DaysExpenseTransactions = await Expense.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            },
        }).sort({ date: -1 });

        const expenseLast60Days = last60DaysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // ------------------ LAST 30 DAYS EXPENSE ------------------
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // ------------------ RECENT TRANSACTIONS ------------------
        const recentTransactions = [
            ...(await Income.find({ userId })
                .sort({ date: -1 })
                .limit(5))
                .map((txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })),

            ...(await Expense.find({ userId })
                .sort({ date: -1 })
                .limit(5))
                .map((txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        // ------------------ FINAL RESPONSE ------------------
        return res.status(200).json({
            totalBalance: totalIncome - totalExpense,

            totalIncome,
            totalExpense,

            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },

            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },

            last60DaysExpenses: {
                total: expenseLast60Days,
                transactions: last60DaysExpenseTransactions,
            },

            recentTransactions,
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};
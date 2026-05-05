import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ExpenseLineChart = ({ data }) => {

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // ✅ Extract month name
  const monthName = today.toLocaleString("en-IN", { month: "long" });

  // 🔥 Step 1: Filter current month
  const monthlyData = data?.filter((item) => {
    const d = new Date(item.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  // 🔥 Step 2: Create all days of month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dailyMap = {};

  // initialize all days = 0
  for (let i = 1; i <= daysInMonth; i++) {
    dailyMap[i] = 0;
  }

  // 🔥 Step 3: Add income amounts
  monthlyData?.forEach((item) => {
    const day = new Date(item.date).getDate();
    dailyMap[day] += Number(item.amount);
  });

  // 🔥 Step 4: Convert to chart format
  const chartData = Object.keys(dailyMap).map((day) => ({
    day,
    amount: dailyMap[day],
  }));

  return (
    <div className="card">
      
      {/* ✅ Updated Heading */}
      <h5 className="text-lg mb-4 font-semibold">
        Monthly Expense ({monthName} {currentYear})
      </h5>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />
            <YAxis />

            <Tooltip formatter={(val) => [`₹${val}`, "Expense"]} />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#F43F5E"
              strokeWidth={3}
              dot={{ r: 5, style: { cursor: 'pointer' } }} 
              activeDot={{ r: 8, style: { cursor: 'pointer' } }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseLineChart;
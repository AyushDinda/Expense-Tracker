import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].value > 0) {
    const item = payload[0].payload;
    return (
      <div className="bg-white px-3 py-2 rounded-xl shadow-md border text-sm">
        <p className="text-rose-500 mb-1">
          {item.category || item.month || "Expense"}
        </p>
        <p className="text-gray-700 font-semibold">
          Amount: ₹{payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

// ✅ Updated to brighter, high-contrast colors
const BRIGHT_COLORS = ["#7C3AED", "#2DD4BF"]; // Vibrant Violet & Bright Teal
// Alternative (Pro-Purple): ["#8B5CF6", "#F472B6"] // Bright Purple & Hot Pink

const CustomBarChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-gray-400">
        No Data Available
      </div>
    );
  }

  const dataKeyName = data[0]?.month ? "month" : data[0]?.category ? "category" : "name";

  // Pre-process to lock the color index to the data point
  const processedData = data.map((item, index) => ({
    ...item,
    colorIndex: index,
    isPadding: false
  }));

  const chartData =
    processedData.length === 1
      ? [
          { [dataKeyName]: "", amount: null, isPadding: true },
          processedData[0],
          { [dataKeyName]: "", amount: null, isPadding: true },
        ]
      : processedData;

  return (
    <div className="w-full bg-white mt-6 p-4 rounded-2xl shadow-sm">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            
            <CartesianGrid vertical={false} stroke="#e2e8f0" />
<XAxis
  dataKey={dataKeyName}
  tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
  stroke="#cbd5e1" // A subtle slate color
  tickLine={false} // Removes the little notches for a cleaner look
/>
<YAxis
  tick={{ fontSize: 12, fill: "#64748b" }}
  stroke="none" 
  axisLine={false}
/>
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="amount"
              radius={[10, 10, 0, 0]}
              barSize={40}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  // If padding -> invisible. If data -> use bright palette.
                  fill={entry.isPadding ? "transparent" : BRIGHT_COLORS[entry.colorIndex % BRIGHT_COLORS.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
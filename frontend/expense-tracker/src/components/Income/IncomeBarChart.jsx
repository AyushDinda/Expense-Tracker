import React from "react";
import { BsQuestionOctagon } from "react-icons/bs";

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

const COLORS = ["#7C3AED", "#2DD4BF"];

// ✅ Updated Tooltip (uses source)
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    return (
      <div className="bg-white px-3 py-2 rounded-xl shadow-md border text-sm">
        <p className="text-rose-500">{item.source}</p>
        <p className="font-semibold text-gray-700">
          ${item.amount}
        </p>
      </div>
    );
  }
  return null;
};

const IncomeBarChart = ({ data = [] }) => {
  // ✅ Consistent Empty State Styling
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center w-full min-h-[300px] py-20 bg-gray-50/50 border border-dashed border-gray-200 rounded-xl col-span-full my-auto">
        <div className="mb-4">
          <BsQuestionOctagon className="text-gray-300 text-6xl opacity-80" />
        </div>
        <p className="text-sm font-bold text-slate-500 tracking-widest uppercase text-center">
          No Income Data Available
        </p>
        <p className="text-xs text-gray-400 mt-2 font-medium text-center">
          Add your first income record to see the chart.
        </p>
      </div>
    );
  }

  const chartData = data.map((item, index) => ({
    ...item,
    idx: index,
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} stroke="#e2e8f0" />

          <XAxis
            dataKey="idx"
            tickFormatter={(i) => chartData[i]?.month}
            tick={{ fontSize: 12, fill: "#64748b" }}
            stroke="#cbd5e1"
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            stroke="none"
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />

          <Bar dataKey="amount" radius={[10, 10, 0, 0]} barSize={40}>
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeBarChart;
import { BsQuestionOctagon } from "react-icons/bs";
import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#0088FE'];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const dataArr = data.map((item) => ({
        name: item?.source || 'Unknown',
        amount: item?.amount || 0,
      }));
      setChartData(dataArr);
    } else {
      setChartData([]);
    }
  }, [data]);

  return (
    <div className='card flex flex-col'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg font-semibold'>Last 60 Days Incomes</h5>
      </div>

      <div className="flex-1 flex flex-col">
        {chartData.length > 0 ? (
          <CustomPieChart
            data={chartData}
            label='Total Income'
            totalAmount={`$${totalIncome?.toLocaleString() || 0}`}
            showTextAnchor
            colors={COLORS}
          />
        ) : (
          /* ✅ Consistent Empty State */
          <div className="flex flex-1 flex-col items-center pb-17 justify-center w-full min-h-[400px] bg-gray-50/50 rounded-xl">
            <div className="p-4 mb-4">
                      {/* <LuUtensils className="text-gray-300 text-2xl" /> */}
                      <BsQuestionOctagon className="text-gray-300 text-6xl"/>
                    </div>
            <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">
              No Data Available
            </p>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              Start adding income sources to see your breakdown.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;
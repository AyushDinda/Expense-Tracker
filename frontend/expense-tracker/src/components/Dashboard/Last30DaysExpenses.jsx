import { BsQuestionOctagon } from "react-icons/bs";
import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setChartData([]);
      return;
    }
    const result = prepareExpenseBarChartData(data);
    setChartData(result || []);
  }, [data]);

  return (
    <div className="card col-span-1 p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Last 30 Days Expenses</h5>
      </div>

      {/* Chart / Empty State */}
      <div className="flex-1 flex flex-col">
        {chartData.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          /* ✅ Consistent Empty State */
          <div className="flex flex-1 flex-col items-center justify-center w-full min-h-[300px] bg-gray-50/50 rounded-xl">
            <div className="p-4 mb-4">
                      {/* <LuUtensils className="text-gray-300 text-2xl" /> */}
                      <BsQuestionOctagon className="text-gray-300 text-6xl"/>
                    </div>
            <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">
              No Data Available
            </p>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              Your spending trends will appear here once recorded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Last30DaysExpenses;
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseBarChartMainData } from "../../utils/helper";
import ExpenseBarChart from "./ExpenseBarChart";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartMainData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-xs text-gray-600 mt-0.5">Track your spendings over time & analyze your expense trends.</p>
        </div>
        <button className="add-btn-expense" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <ExpenseBarChart data={chartData}/>
      </div>
    </div>
  );
};

export default ExpenseOverview;
import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import ExpenseLineChart from '../../components/Expense/ExpenseLineChart';
import ExpenseList from '../../components/Expense/ExpenseList';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/DeleteAlert';
import { toast } from "react-hot-toast"; 

const Expense = () => {
  useUserAuth();
  const [editData, setEditData] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // ================= FETCH =================
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );

      if (response?.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch expenses");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= ADD =================
  
  const handleAddExpense = async (data) => {
    const { category, amount, date, icon, _id } = data;

    if (!category?.trim()) return toast.error("Category required");
    if (!amount || Number(amount) <= 0) return toast.error("Invalid amount");
    if (!date) return toast.error("Date required");

    try {
      if (_id) {
        await axiosInstance.put(
          API_PATHS.EXPENSE.UPDATE_EXPENSE(_id),
          { category, amount, date, icon }
        );
      } else {
        await axiosInstance.post(
          API_PATHS.EXPENSE.ADD_EXPENSE,
          { category, amount, date, icon }
        );
      }

      setEditData(null);
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();

    } catch {
      toast.error("Error");
    }
  };

  // ================= DELETE =================
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );

      toast.success("Expense deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete expense"
      );
    }
  };

  // ================= DOWNLOAD =================
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.error("Error downloading expense details:",error);
      toast.error("Failed to download Expense_Details.xlsx....Please try again");
    }
  };

  // ================= INIT =================
  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">

        <div className="grid grid-cols-1 gap-6">

          {/* Overview */}
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => {
              setEditData(null);
              setOpenAddExpenseModal(true);
            }}
          />

          {/* Graph */}
          <ExpenseLineChart data={expenseData} />

          {/* List */}
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) =>
              setOpenDeleteAlert({ show: true, data: id })
            }
            onDownload={handleDownloadExpenseDetails}
            onEdit={(item) => {
            setEditData(item);
            setOpenAddExpenseModal(true);
          }}
          />
        </div>

        {/* Add Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title={editData ? "Edit Expense" : "Add Expense"}
        >
          {/* <AddExpenseForm onAddExpense={handleAddExpense} /> */}
          <AddExpenseForm 
            onAddExpense={handleAddExpense}
            editData={editData}
          />
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({ show: false, data: null })
          }
          title="Delete Expense"
        >
          <DeleteAlert
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            content="Are you sure you want to delete this expense?"
          />
        </Modal>

      </div>
    </DashboardLayout>
  );
};

export default Expense;
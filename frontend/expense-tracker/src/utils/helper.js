import moment from "moment";
import { data } from "react-router-dom";

// ================= CURRENCY FORMAT =================
export const formatCurrency = (amount) => {
  if (!amount) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// ================= DATE FORMAT =================
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ================= GET GREETING =================
export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning ☀️";
  if (hour < 18) return "Good Afternoon 🌤️";
  return "Good Evening 🌙";
};

// ================= VALIDATE EMAIL =================
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ================= TRUNCATE TEXT =================
export const truncateText = (text, maxLength = 20) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};

// ================= CALCULATE TOTAL =================
export const calculateTotal = (transactions) => {
  return transactions.reduce((total, item) => total + item.amount, 0);
};

// ================= FILTER BY TYPE =================
export const filterByType = (transactions, type) => {
  return transactions.filter((item) => item.type === type);
};

// ================= GET INITIALS =================
export const getInitials = (fullName) => {
  if (!fullName) return "";
  const names = fullName.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(2, names.length); i++) {
    initials += names[i][0].toUpperCase();
  }
  return initials;
};

// ================= ADD THOUSAND SEPARATOR =================
export const addThousandSeparator = (num) => {
  if(num === null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item)=>({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
}

export const prepareIncomeBarChartData = (data = []) =>{
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source, 

  }));
  return chartData;
}

export const prepareExpenseBarChartMainData = (data = []) =>{
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    category: item?.category, 

  }));
  return chartData;
}
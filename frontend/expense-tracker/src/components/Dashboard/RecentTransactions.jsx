// import React from 'react'
// import { LuArrowRight } from 'react-icons/lu'
// import moment from 'moment';
// import TransactionInfoCard from '../Cards/TransactionInfoCard';

// const RecentTransactions = ({transactions, onSeeMore}) => {
//   return (
//     <div className='card'>
//         <div className='flex items-center justify-between'>
//             <h5 className='text-lg font-semibold'>Recent Transactions</h5>
//             <button className='card-btn' onClick={onSeeMore}>
//                 See All <LuArrowRight className='text-base'/>
//             </button>
//         </div>

//         {/* <div className='mt-6'>
//             {transactions?.slice(0,5)?.map((item)=>(
//                 <TransactionInfoCard 
//                     key={item._id}
//                     title={item.type === 'expense' ? item.category : item.source}
//                     icon={item.icon}
//                     date={moment(item.date).format("Do MMM YYYY")}
//                     amount={item.amount}
//                     type={item.type}
//                     hideDeleteBtn
//                 />
//             ))}
//         </div> */}
//         <div className="mt-6">
//   {transactions && transactions.length > 0 ? (
//     transactions.slice(0, 5).map((expense) => (
//       <TransactionInfoCard
//         key={expense._id}
//         title={expense.category}
//         icon={expense.icon}
//         date={moment(expense.date).format("Do MMM YYYY")}
//         amount={expense.amount}
//         type="expense"
//         hideDeleteBtn
//       />
//     ))
//   ) : (
//     /* ✅ This shows the "No Data" text when the array is empty */
//     <TransactionInfoCard />
//   )}
// </div>
//     </div>
//   )
// }

// export default RecentTransactions


import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    // Added 'flex flex-col' and a min-height to the card itself if needed
    <div className='card flex flex-col min-h-[450px]'> 
        <div className='flex items-center justify-between'>
            <h5 className='text-lg font-semibold'>Recent Transactions</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>

        {/* Changed this div to:
          1. flex-1: Fill all remaining vertical space in the card
          2. flex flex-col: Allow children to be centered
        */}
        <div className='mt-6 flex-1 flex flex-col'>
            {transactions && transactions.length > 0 ? (
                transactions.slice(0, 5).map((item) => (
                    <TransactionInfoCard 
                        key={item._id}
                        title={item.type === 'expense' ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))
            ) : (
                /* This now sits inside a flex-1 container */
                <TransactionInfoCard />
            )}
        </div>
    </div>
  )
}

export default RecentTransactions;
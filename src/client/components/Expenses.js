import React, { useState, useEffect } from 'react';
import './Expenses.css';
import Expense from './Expense';

const Expenses = ({ expensesList, handleEdit }) => {
  const expenses = expensesList.map((expense, i) => {
    return (
      <Expense
        key={`${expense}${i}`}
        id={expense._id}
        amount={expense.amount}
        category={expense.category}
        date={expense.date}
        expense={expense.expense}
        handleEdit={handleEdit}
      />
    );
  });
  return (
    <div container="expenses">
      <table>
        <thead>
          <tr className="expenses-heading">
            <th>Transaction</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{expenses}</tbody>
      </table>
    </div>
  );
};

export default Expenses;

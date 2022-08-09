import React, { useState, useEffect } from 'react';
import './Expenses.css';
import Expense from './Expense';

const Expenses = () => {
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {}, [setExpensesList]);

  return (
    <div>
      <div className="expense-heading">
        <p>Transaction</p>
        <p>Date</p>
        <p>Amount</p>
        <p>Type</p>
      </div>
      <Expense />
    </div>
  );
};

export default Expenses;

import React from 'react';
import './Expense.css';

const Expense = () => {
  return (
    <div className="expense">
      <p>Type</p>
      <p>Name</p>
      <p>Amount</p>
      <p>Category</p>
      <p>Date</p>
      <div className="expense-btns">
        <button>Edit</button>
        <button>X</button>
      </div>
    </div>
  );
};

export default Expense;

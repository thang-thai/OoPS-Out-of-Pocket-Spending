import React, { useState } from 'react';
import axios from 'axios';
import './EditExpense.css';
const Transaction = require('../../server/models/transactionModel');

const EditExpense = ({ closeModal, editId, expensesList, setExpensesList }) => {
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(editId);
    axios
      .put('/api/update-expense', { expense, amount, category, date, editId })
      .then(res => console.log(res.data));

    // Reset values
    setExpense('');
    setAmount('');
    setCategory('');
    setDate('');
    closeModal();
  };

  return (
    <form className="transactions" onSubmit={handleSubmit}>
      <p className="transaction-heading">Edit Expense</p>
      <input
        id="expense"
        type="text"
        placeholder="Expense"
        onChange={e => setExpense(e.target.value)}
        value={expense}
        required
      />
      <input
        id="amount"
        type="number"
        placeholder="$"
        onChange={e => setAmount(e.target.value)}
        value={amount}
        required
      />
      <input
        id="category"
        type="text"
        placeholder="Category"
        onChange={e => setCategory(e.target.value)}
        value={category}
        required
      />
      <input
        id="date"
        type="date"
        onChange={e => setDate(e.target.value)}
        value={date}
        required
      />
      <div className="btns">
        <button className="btn-1">Update</button>
        <button className="btn-2">Clear</button>
      </div>
      <button onClick={closeModal} className="btn-3">
        Cancel
      </button>
    </form>
  );
};

export default EditExpense;

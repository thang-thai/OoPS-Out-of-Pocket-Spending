import axios from 'axios';
import React, { useState } from 'react';
import './add-transaction.css';
const Transaction = require('../../../server/models/transactionModel');

const AddTransaction = ({ expensesList, setExpensesList, userInfo }) => {
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const { id: userId } = userInfo;

  const handleSubmit = e => {
    e.preventDefault();

    // axios.post('/api/addExpense', { expense, amount, category, date });
    axios
      .post('/api/add-expense', { expense, amount, category, date, userId })
      .then(res => {
        setExpensesList([...expensesList, res.data]);
      });

    // Reset values
    setExpense('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <form className="transactions" onSubmit={handleSubmit}>
      <p className="transaction-heading">New Expense</p>
      <input
        className="input"
        id="expense"
        type="text"
        placeholder="Expense"
        onChange={e => setExpense(e.target.value)}
        value={expense}
        required
      />
      <input
        className="input"
        id="amount"
        type="number"
        placeholder="$"
        onChange={e => setAmount(e.target.value)}
        value={amount}
        required
      />
      <input
        className="input"
        id="category"
        type="text"
        placeholder="Category"
        onChange={e => setCategory(e.target.value)}
        value={category}
        required
      />
      <input
        className="input"
        id="date"
        type="date"
        onChange={e => setDate(e.target.value)}
        value={date}
        required
      />
      <div className="btns">
        <button className="btn-1">Add</button>
        <button className="btn-2">Clear</button>
      </div>
    </form>
  );
};

export default AddTransaction;

import React, { useState } from 'react';
import axios from 'axios';
import './edit-expense.css';
const Transaction = require('../../../../server/models/transactionModel');

const EditExpense = ({
  closeModal,
  editId,
  expensesList,
  setExpensesList,
  currItem,
}) => {
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  // const {
  //   expense: currExpense,
  //   amount: currAmount,
  //   category: currCategory,
  //   date: currDate,
  // } = currItem[0];

  // console.log('CURR EXPENSE:', currExpense);

  const setClear = () => {
    setExpense('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put('/api/update-expense', { expense, amount, category, date, editId })
      .then(res => {
        axios.get('/api/get-expenses').then(res => {
          setExpensesList([...res.data]);
        });
      });

    // Reset values
    setExpense('');
    setAmount('');
    setCategory('');
    setDate('');
    closeModal();
  };

  return (
    <form className="edit-expense" onSubmit={handleSubmit}>
      <p className="edit-heading">Edit Expense</p>
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
        <button onClick={setClear} className="btn-2">
          Clear
        </button>
      </div>
      <button onClick={closeModal} className="btn-3">
        Cancel
      </button>
    </form>
  );
};

export default EditExpense;

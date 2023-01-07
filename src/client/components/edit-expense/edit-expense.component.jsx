import React, { useState } from 'react';
import axios from 'axios';
import './edit-expense.styles.css';
const Transaction = require('../../../server/models/transactionModel');

const defaultFormFields = {
  expense: '',
  amount: '',
  category: '',
  date: '',
};

const EditExpense = ({ closeModal, editId, expensesList, setExpensesList, currItem }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { expense, amount, category, date } = formFields;
  // const [expense, setExpense] = useState('');
  // const [amount, setAmount] = useState('');
  // const [category, setCategory] = useState('');
  // const [date, setDate] = useState('');

  // const {
  //   expense: currExpense,
  //   amount: currAmount,
  //   category: currCategory,
  //   date: currDate,
  // } = currItem[0];

  // console.log('CURR EXPENSE:', currExpense);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleClear = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios
      .put(`/api/updateExpense/`, { expense, amount, category, date, editId })

      .then(res => {
        axios.get('/api/get-expenses').then(res => {
          setExpensesList([...res.data]);
        });
      });
    closeModal();

    // Reset values
    // setExpense('');
    // setAmount('');
    // setCategory('');
    // setDate('');
  };

  return (
    <form className="edit-expense" onSubmit={handleSubmit}>
      <p className="edit-heading">Edit Expense</p>
      <input id="expense" type="text" placeholder="Expense" onChange={handleChange} name="expense" value={expense} required />
      <input id="amount" type="number" placeholder="$" onChange={handleChange} name="amount" value={amount} required />
      <input id="category" type="text" placeholder="Category" onChange={handleChange} name="category" value={category} required />
      <input id="date" type="date" onChange={handleChange} name="date" value={date} required />
      <div className="btns">
        <button className="btn-1">Update</button>
        <button onClick={handleClear} className="btn-2">
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

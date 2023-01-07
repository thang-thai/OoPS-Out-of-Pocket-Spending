import axios from 'axios';
import React, { useState, useContext } from 'react';
import { ExpensesContext } from '../../contexts/expenses.context';
import { AuthContext } from '../../contexts/auth.context';
import './add-transaction.styles.css';

const defaultFormFields = {
  expense: '',
  amount: '',
  category: '',
  date: '',
};

const AddTransaction = () => {
  const { currentUser } = useContext(AuthContext);
  const { expensesList, setExpensesList } = useContext(ExpensesContext);
  const { id } = currentUser;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { expense, amount, category, date } = formFields;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('/api/addExpense', { expense, amount, category, date, id });
    setExpensesList([...expensesList, res.data]);
    setFormFields(defaultFormFields);
  };

  return (
    <form className="transactions" onSubmit={handleSubmit}>
      <p className="transaction-heading">New Expense</p>
      <input className="input" id="expense" type="text" placeholder="Expense" onChange={handleChange} name="expense" value={expense} required />
      <input className="input" id="amount" type="number" placeholder="$" onChange={handleChange} name="amount" value={amount} required />
      <input className="input" id="category" type="text" placeholder="Category" onChange={handleChange} name="category" value={category} required />
      <input className="input" id="date" type="date" onChange={handleChange} name="date" value={date} required />
      <div className="btns">
        <button className="btn-1">Add</button>
        <button className="btn-2">Clear</button>
      </div>
    </form>
  );
};

export default AddTransaction;

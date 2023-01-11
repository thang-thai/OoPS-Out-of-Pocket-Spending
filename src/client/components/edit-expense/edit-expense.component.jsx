import React, { useState, useContext } from 'react';
import { ExpensesContext } from '../../contexts/expenses.context';
import axios from 'axios';
import './edit-expense.styles.css';

// Default form state
const defaultFormFields = {
  expense: '',
  amount: '',
  category: '',
  date: '',
};

const EditExpense = ({ closeModal, editId }) => {
  const { expensesList, setExpensesList } = useContext(ExpensesContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { expense, amount, category, date } = formFields;

  // Handler for updating form fields
  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Resets all form fields
  const handleClear = () => {
    setFormFields(defaultFormFields);
  };

  //  Updates expense in DB
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.put(`/api/updateExpense/`, { expense, amount, category, date, editId });
    const updatedExpenses = expensesList.filter(expense => expense.expense_id != editId);
    setExpensesList([...updatedExpenses, res.data]);
    closeModal();
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

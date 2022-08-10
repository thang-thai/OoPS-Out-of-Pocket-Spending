import axios from 'axios';
import React from 'react';
import './Expense.css';

const Expense = ({ id, amount, category, date, expense, handleEdit }) => {
  const handleUpdate = e => {
    handleEdit(e);
  };

  const handleDelete = e => {
    console.log(e.target.value);
    axios.delete('/api/delete-expense', { data: { data: e.target.value } });
  };

  return (
    <tr id={id}>
      <td>{expense}</td>
      <td>{new Date(date).toDateString()}</td>
      <td>{`$${amount.toFixed(2)}`}</td>
      <td>{category}</td>
      <td className="btns">
        <button value={id} onClick={e => handleUpdate(e)} className="btn-edit">
          Edit
        </button>
        <button
          value={id}
          onClick={e => handleDelete(e)}
          className="btn-delete"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Expense;

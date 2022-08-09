import React from 'react';
import './AddTransaction.css';

const AddTransaction = () => {
  return (
    <form className="transactions">
      <p className="transaction-heading">Add Transaction</p>
      <select>
        <option disabled="disabled" selected="selected">
          Transaction Type
        </option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input type="text" placeholder="Expense" />
      <input type="number" placeholder="$" />
      <input type="text" placeholder="Category" />
      <input type="date" />
      <div className="btns">
        <button className="btn-1">Submit</button>
        <button classname="btn-2">Clear</button>
      </div>
    </form>
  );
};

export default AddTransaction;

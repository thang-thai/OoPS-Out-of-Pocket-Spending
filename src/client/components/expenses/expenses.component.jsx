import React, { useState, useEffect, useContext } from 'react';
import './expenses.styles.css';
import Expense from '../expense/expense.component';
import { ExpensesContext } from '../../contexts/expenses.context';

const Expenses = ({ handleEdit, userId, handleDelete }) => {
  const { expensesList, setExpensesList } = useContext(ExpensesContext);
  const sortDate = () => {};
  const sortAmount = () => {};
  const sortType = () => {};

  const expenses = expensesList.map(expense => {
    return <Expense key={expense.expense_id} expense={expense} handleEdit={handleEdit} handleDelete={handleDelete} />;
  });
  return (
    <div container="expenses">
      <table className="table-heading">
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>{null}</th>
          </tr>
        </thead>
      </table>
      <div className="expenses-body">
        <table>
          <tbody>{expenses.reverse()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;

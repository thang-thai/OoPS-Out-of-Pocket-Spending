import React, { useState, useEffect } from 'react';
import './Expenses.css';
import Expense from './Expense';

const Expenses = ({ expensesList, setExpensesList, handleEdit, userId }) => {
  const sortDate = () => {};
  const sortAmount = () => {};
  const sortType = () => {};

  const expenses = expensesList
    .filter(expense => expense.userId === userId)
    .map((expense, i) => {
      return (
        <Expense
          key={`${expense}${i}`}
          expensesList={expensesList}
          id={expense._id}
          amount={expense.amount}
          category={expense.category}
          date={expense.date}
          expense={expense.expense}
          handleEdit={handleEdit}
        />
      );
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

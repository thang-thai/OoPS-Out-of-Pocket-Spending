import { createContext } from 'react';
import React from 'react';
import { useState, useEffect } from 'react';

export const ExpensesContext = createContext({
  expensesTotal: 0,
  setTotalExpenses: () => null,
  setExpensesTotal: [],
  setExpensesList: () => null,
});

export const ExpensesProvider = ({ children }) => {
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [expensesList, setExpensesList] = useState([]);
  const value = { expensesList, setExpensesList, expensesTotal };

  useEffect(() => {
    const total = expensesList.reduce((acc, curr) => acc + Number(curr.amount), 0);
    setExpensesTotal(total);
  });

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

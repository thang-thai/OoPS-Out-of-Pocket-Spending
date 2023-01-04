import { useContext } from 'react';
import React from 'react';
import { useState } from 'react';

export const ExpensesContext = createContext({
  expensesList: [],
  setExpensesList: () => null,
});

export const ExpensesProvider = ({ children }) => {
  const [expensesList, setExpensesList] = useState([]);
  const value = { expensesList, setExpensesList };

  return <ExpensesContext.Provider value={value}></ExpensesContext.Provider>;
};

import React, { useContext } from 'react';
import { ExpensesContext } from '../../contexts/expenses.context';
import './totals.styles.css';

const Totals = () => {
  const { expensesList } = useContext(ExpensesContext);
  const categoriesAndExpenses = expensesList.map(e => [e.category, e.amount]);
  const categories = [...new Set(expensesList.map(e => e.category))];
  const categoryTotals = categories.map(category => {
    const total = categoriesAndExpenses.filter(c => c[0] == category).reduce((acc, curr) => acc + Number(curr[1]), 0);
    return [category, total];
  });

  return (
    <div>
      <h1 className="totals-heading">Totals </h1>
      <div className="total-container">
        <p className="category-total">Category 1</p>
        <p className="category-total">Category 2</p>
        <p className="category-total">Category 3</p>
      </div>
    </div>
  );
};

export default Totals;

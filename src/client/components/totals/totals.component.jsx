import React, { useContext } from 'react';
import { ExpensesContext } from '../../contexts/expenses.context';
import './totals.styles.css';

const Totals = () => {
  const { expensesList } = useContext(ExpensesContext);
  const categories = expensesList.map(e => e.category);

  return (
    <div>
      <h1 className="totals-heading">Totals </h1>
      <div className="total-container">
        <p className="total">Category 1</p>
        <p className="total">Category 2</p>
        <p className="total">Category 3</p>
      </div>
    </div>
  );
};

export default Totals;

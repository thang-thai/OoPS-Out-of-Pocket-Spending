import React, { useContext } from 'react';
import { ExpensesContext } from '../../contexts/expenses.context';
import CategoryTotal from '../category-total/category-total.component';
import '../category-totals/totals.styles.css';

const Totals = () => {
  const { expensesList } = useContext(ExpensesContext);
  const categoriesAndExpenses = expensesList.map(e => [e.category, e.amount]);
  const categories = [...new Set(expensesList.map(e => e.category))];
  const categoryTotals = categories
    .map((category, i) => {
      const total = categoriesAndExpenses.filter(c => c[0] == category).reduce((acc, curr) => acc + Number(curr[1]), 0);
      return <CategoryTotal key={`${category}${i}`} category={category} total={total} />;
    })
    .sort((a, b) => b.props.total - a.props.total);

  return (
    <div>
      <h1 className="totals-heading">Totals </h1>
      <div className="total-container">{categoryTotals}</div>
    </div>
  );
};

export default Totals;

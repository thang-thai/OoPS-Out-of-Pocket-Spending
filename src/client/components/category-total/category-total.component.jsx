import React from 'react';
import './category-total.styles.css';

const CategoryTotal = ({ category, total }) => {
  return (
    <div className="category-total">
      <p>{category}</p>
      <p>{total.toFixed(2)}</p>
    </div>
  );
};

export default CategoryTotal;

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context.jsx';
import { ExpensesContext } from '../../contexts/expenses.context.jsx';

import AddTransaction from '../../components/add-transaction/add-transaction.component';
import Expenses from '../../components/expenses/expenses.component';
import EditExpense from '../../components/edit-expense/edit-expense.component';
import Nav from '../../components/navbar/navbar.component.jsx';
import Overlay from '../../components/overlay/overlay.component';
import Totals from '../../components/category-totals/totals.component.jsx';

import axios from 'axios';
import './home.styles.css';

const Home = () => {
  const [editId, setEditId] = useState('');
  const [currItem, setCurrItem] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { expensesList, setExpensesList } = useContext(ExpensesContext);

  // Handler for editing an expense
  const handleEdit = (_, id) => {
    const expense = expensesList.filter(expense => expense._id === id);
    setCurrItem([...expense]);
    setEditId(id);
    setOpenModal(true);
  };

  // Handler for deleting an expense
  const handleDelete = async (_, id) => {
    try {
      const res = await axios.delete(`/api/deleteExpense/${id}`);
      if (res) {
        const updatedExpenses = expensesList.filter(expense => expense.expense_id != id);
        setExpensesList([...updatedExpenses]);
      }
    } catch (error) {}
  };

  // Opens modal for editing an expense
  const closeModal = () => setOpenModal(false);

  // Render all current expenses on load if any exists for user
  useEffect(() => {
    const getExpenses = async () => {
      try {
        if (currentUser) {
          const res = await axios.post(`/api/getExpenses/${currentUser.id}`);
          setExpensesList(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, [currentUser]);

  return (
    <div className="home-container">
      {openModal ? <Overlay /> : null}
      <Nav />
      <main className="main-container">
        <div className="edit-modal">{openModal ? <EditExpense closeModal={closeModal} editId={editId} currItem={currItem} /> : null}</div>
        <section className="expenses">
          <Expenses handleEdit={handleEdit} handleDelete={handleDelete} />
        </section>
        <section className="transaction-container">
          <section className="add-transaction">
            <AddTransaction />
          </section>
          <section className="totals">
            <Totals />
          </section>
        </section>
      </main>
      <footer className="footer">Out of Pocket Spending (OoPS)</footer>
    </div>
  );
};

export default Home;

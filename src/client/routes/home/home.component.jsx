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
  // const [totalExpenses, setTotalExpenses] = useState(0);
  // const [expensesList, setExpensesList] = useState([]);
  // const { id, firstName, lastName } = currentUser;
  const [editId, setEditId] = useState('');
  const [currItem, setCurrItem] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { expensesList, setExpensesList } = useContext(ExpensesContext);
  // const { id, firstName, lastName } = currentUser;

  // const [sortedTransactions, setSortedTransactions] = useState([
  //   ...expensesList,
  // ]);

  const handleEdit = (_, id) => {
    const expense = expensesList.filter(expense => expense._id === id);
    setCurrItem([...expense]);
    setEditId(id);
    setOpenModal(true);
  };

  const handleDelete = async (_, id) => {
    try {
      const res = await axios.delete(`/api/deleteExpense/${id}`);
      if (res) {
        const updatedExpenses = expensesList.filter(expense => expense.expense_id != id);
        setExpensesList([...updatedExpenses]);
      }
    } catch (error) {}
  };

  const closeModal = () => setOpenModal(false);

  // Render all current expenses on load
  useEffect(() => {
    const getExpenses = async () => {
      try {
        if (currentUser) {
          console.log(currentUser, currentUser.id);
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

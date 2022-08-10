import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Nav from './Navbar';
import AddTransaction from './AddTransaction';
import Expenses from './Expenses';
import './App.css';
import EditExpense from './EditExpense';

const App = () => {
  const [expensesList, setExpensesList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState('');

  const handleEdit = e => {
    setEditId(e.target.value);
    setOpenModal(true);
    console.log('ALL THE WAY BACK UP', e.target.value);
  };

  const closeModal = () => setOpenModal(false);

  // Render all current expenses on load
  useEffect(() => {
    axios
      .get('/api/get-expenses')
      .then(async res => {
        await setExpensesList(res.data);
      })
      .catch(err => console.log(err));
  }, [expensesList]);

  return (
    <div>
      <header>
        <Nav />
      </header>
      <main className="main-container">
        <div className="edit-modal">
          {openModal ? (
            <EditExpense closeModal={closeModal} editId={editId} />
          ) : null}
        </div>
        <section>
          <a href="#">Summary</a>
          <a href="#">All Expenses</a>
        </section>
        <section className="expenses">
          <Expenses expensesList={expensesList} handleEdit={handleEdit} />
        </section>
        <section className="add-transaction">
          <AddTransaction />
        </section>
      </main>
    </div>
  );
};

export default App;

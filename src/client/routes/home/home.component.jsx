import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Nav from '../../components/navbar/navbar.component.jsx';
import AddTransaction from '../../components/add-transaction/add-transaction.component';
import Expenses from '../../components/expenses/expenses.component';
import './home.styles.css';
import EditExpense from '../../components/edit-expense/edit-expense.component';
import Overlay from '../../components/overlay/overlay.component';

const Home = ({ username, password, userInfo }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesList, setExpensesList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState('');
  const [currItem, setCurrItem] = useState([]);
  // const [sortedTransactions, setSortedTransactions] = useState([
  //   ...expensesList,
  // ]);
  // const { id: userId } = userInfo;

  const handleEdit = (e, id) => {
    const expense = expensesList.filter(expense => expense._id === id);
    setCurrItem([...expense]);
    setEditId(id);
    setOpenModal(true);
  };

  const handleDelete = (e, id) => {
    axios.delete('/api/delete-expense', { data: { data: id } });
  };

  const calculateTotal = () => {
    const total = expensesList.filter(expense => expense.userId === userId).reduce((acc, curr) => (acc += curr.amount), 0);
    setTotalExpenses(total);
  };

  const closeModal = () => setOpenModal(false);

  // Render all current expenses on load
  useEffect(() => {
    axios
      .get('/api/get-expenses')
      .then(res => {
        setExpensesList([...res.data]);
        calculateTotal();
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      {openModal ? <Overlay /> : null};
      <header>
        <Nav userInfo={userInfo} totalExpenses={totalExpenses} />
      </header>
      <main className="main-container">
        <div className="edit-modal">{openModal ? <EditExpense closeModal={closeModal} editId={editId} expensesList={expensesList} setExpensesList={setExpensesList} currItem={currItem} /> : null}</div>
        <section className="expenses">
          <Expenses expensesList={expensesList} setExpensesList={setExpensesList} handleEdit={handleEdit} handleDelete={handleDelete} userId={userId} />
        </section>
        <section className="add-transaction">
          <AddTransaction expensesList={expensesList} setExpensesList={setExpensesList} userInfo={userInfo} />
        </section>
      </main>
    </div>
  );
};

export default Home;

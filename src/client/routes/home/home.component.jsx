import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context.jsx';
import AddTransaction from '../../components/add-transaction/add-transaction.component';
import Expenses from '../../components/expenses/expenses.component';
import EditExpense from '../../components/edit-expense/edit-expense.component';
import Nav from '../../components/navbar/navbar.component.jsx';
import Overlay from '../../components/overlay/overlay.component';
import axios from 'axios';
import './home.styles.css';
import { ExpensesContext } from '../../contexts/expenses.context.jsx';

const Home = () => {
  // const [totalExpenses, setTotalExpenses] = useState(0);
  // const [expensesList, setExpensesList] = useState([]);
  // const { id, firstName, lastName } = currentUser;
  const [editId, setEditId] = useState('');
  const [currItem, setCurrItem] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { expensesList, setExpensesList } = useContext(ExpensesContext);
  const { id, firstName, lastName } = currentUser;

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
    console.log(id);
    try {
      const res = await axios.delete(`/api/deleteExpense/${id}`);
      if (res) {
        const updatedExpenses = expensesList.filter(expense => expense.expense_id != id);
        setExpensesList([...updatedExpenses]);
      }
    } catch (error) {}
  };

  const calculateTotal = () => {
    const total = expensesList.filter(expense => expense.userId === userId).reduce((acc, curr) => (acc += curr.amount), 0);
    setTotalExpenses(total);
  };

  const closeModal = () => setOpenModal(false);

  // Render all current expenses on load
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await axios.post(`/api/getExpenses/${id}`);
        setExpensesList(res.data);
        // calculateTotal();
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, []);
  return (
    <div>
      {openModal ? <Overlay /> : null};
      <Nav />
      <main className="main-container">
        <div className="edit-modal">{openModal ? <EditExpense closeModal={closeModal} editId={editId} currItem={currItem} /> : null}</div>
        <section className="expenses">
          <Expenses handleEdit={handleEdit} handleDelete={handleDelete} />
        </section>
        <section className="add-transaction">
          <AddTransaction />
        </section>
      </main>
    </div>

    // <div>
    //   {openModal ? <Overlay /> : null};
    //   <header>
    //     <Nav totalExpenses={totalExpenses} />
    //   </header>
    //   <main className="main-container">
    //     <div className="edit-modal">{openModal ? <EditExpense closeModal={closeModal} editId={editId} expensesList={expensesList} setExpensesList={setExpensesList} currItem={currItem} /> : null}</div>
    //     <section className="expenses">
    //       <Expenses
    //         expensesList={expensesList}
    //         setExpensesList={setExpensesList}
    //         handleEdit={handleEdit}
    //         handleDelete={handleDelete}
    //         // userId={userId}
    //       />
    //     </section>
    //     <section className="add-transaction">
    //       <AddTransaction expensesList={expensesList} setExpensesList={setExpensesList} />
    //     </section>
    //   </main>
    // </div>
  );
};

export default Home;

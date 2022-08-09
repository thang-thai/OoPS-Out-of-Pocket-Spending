import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Navbar';
import AddTransaction from './AddTransaction';
import Expenses from './Expenses';
import './App.css';

const App = () => {
  // const [heading, setHeading] = useState('');
  // const request = () => {
  //   axios.get('/api').then(res => setHeading(res.data));
  // };
  return (
    <div>
      <header>
        <Nav />
      </header>
      <main className="main-container">
        <section>
          <a href="#">Summary</a>
          <a href="#">All Expenses</a>
        </section>
        <section className="expenses">
          <Expenses />
        </section>
        <section className="add-transaction">
          <AddTransaction />
        </section>
      </main>
    </div>
  );
};

export default App;

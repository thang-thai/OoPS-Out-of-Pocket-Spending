const express = require('express');

const apiController = require('../controllers/apiController');

const router = express.Router();

// Add transaction route
router.get('/get-expenses', apiController.getExpenses, (req, res) => {
  return res.status(200).json(res.locals.expenses);
});

router.post('/add-expense', apiController.addExpense, (req, res) => {
  return res.status(200).send('Expense Added');
});

router.put('/update-expense', apiController.updateExpense, (req, res) => {
  return res.status(200).json({});
});

router.delete('/delete-expense', apiController.deleteExpense, (req, res) => {
  return res.status(200).json('Expense Deleted');
});

module.exports = router;

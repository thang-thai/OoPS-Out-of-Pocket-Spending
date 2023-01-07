const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router();

// Add transaction route
router.post('/getExpenses/:id', apiController.getExpenses, (req, res) => {
  return res.status(200).json(res.locals.expenses);
});

router.post('/addExpense', apiController.addExpense, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.put('/updateExpense', apiController.updateExpense, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.delete('/deleteExpense/:id', apiController.deleteExpense, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;

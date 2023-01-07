const apiController = {};
const TransactionModel = require('../models/transactionModel');
const db = require('../models/db');

apiController.getExpenses = async (req, res, next) => {
  const { id } = req.params;
  try {
    const query = `SELECT e.expense_id, e.expense_name, e.amount, e.category, e.date from expenses AS e LEFT JOIN users AS u ON u.user_id = e.user_id WHERE u.user_id = $1;`;
    const values = [id];
    const data = await db.query(query, values);

    res.locals.expenses = data.rows;
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in apiController.getExpenses',
      msg: { err: 'ERROR: Error in apiController.getExpenses' },
    });
  }
};

apiController.addExpense = async (req, res, next) => {
  const { expense, amount, category, date, id } = req.body;
  console.log(expense, amount, category, date, id);
  try {
    const query = `INSERT INTO expenses (expense_name, amount, category, "date", user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [expense, amount, category, date, id];
    const data = await db.query(query, values);
    res.locals.data = data.rows[0];
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in apiController.addExpense',
      msg: { err: 'ERROR: Error in apiController.addExpense' },
    });
  }
};

apiController.updateExpense = async (req, res, next) => {
  const { expense, amount, category, date, editId } = req.body;
  try {
    const data = await TransactionModel.findByIdAndUpdate({ _id: editId }, { expense, amount, category, date });
    res.locals.data = data;
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in apiController.addExpense',
      msg: { err: 'ERROR: Error in apiController.addExpense' },
    });
  }
};

apiController.deleteExpense = async (req, res, next) => {
  const { data: id } = req.body;
  try {
    await TransactionModel.findByIdAndDelete({ _id: id });
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in apiController.addExpense',
      msg: { err: 'ERROR: Error in apiController.addExpense' },
    });
  }
};

// export controller
module.exports = apiController;

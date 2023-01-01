const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const db = require('../models/db');

const authController = {};

// controller for verifying if user exists in DB
authController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const query = `SELECT * FROM users WHERE users.username = $1`;
    const values = [username];
    const user = await db.query(query, values);
    const match = await bcrypt.compare(password, user.rows[0].password);
    res.locals.auth = match ? user.rows[0] : false;
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in authController.verifyUser',
      msg: { err: 'ERROR: Error in authController.verifyUser' },
    });
  }
};

// controlelr for adding user to the DB with password hashing
authController.addUser = (req, res, next) => {
  if (res.locals.auth) return next();

  const { email, firstName, lastName, username, password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      const query = `INSERT INTO users (username, "password", email, first_name, last_name) VALUES ($1, $2, $3, $4, $5)`;
      const values = [username, hash, email, firstName, lastName];
      const user = await db.query(query, values);
      res.locals.user = user ? user : null;
      return next();
    } catch (error) {
      return next({
        log: 'ERROR: Error in authController.addUser',
        msg: { err: 'ERROR: Error in authController.addUser' },
      });
    }
  });
};

module.exports = authController;

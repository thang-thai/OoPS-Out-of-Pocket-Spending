const bcrypt = require('bcrypt');
const db = require('../models/db');

const authController = {};

// controller for verifying if user exists in DB
// all logins and signups will flow through this middleware. if signing up and user is verified to not exist in DB yet, directed to next middleware to add user
authController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const query = `SELECT * FROM users WHERE users.username = $1`;
    const values = [username];
    const user = await db.query(query, values);

    if (user.rows[0]) {
      const match = await bcrypt.compare(password, user.rows[0].password);
      res.locals.auth = match ? user.rows[0] : false;
      return next();
    }

    res.locals.auth = false;
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in authController.verifyUser',
      msg: { err: 'ERROR: Error in authController.verifyUser' },
    });
  }
};

// controlelr for adding user to the DB with password hashing
// if user already exists, directed to final middleware without adding duplicate user
authController.addUser = (req, res, next) => {
  if (res.locals.auth) return next();

  const { email, firstName, lastName, username, password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      const query = `INSERT INTO users (username, "password", email, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const values = [username, hash, email, firstName, lastName];
      const user = await db.query(query, values);
      const { user_id, first_name, last_name } = user.rows[0];
      res.locals.auth = { user_id, first_name, last_name };
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

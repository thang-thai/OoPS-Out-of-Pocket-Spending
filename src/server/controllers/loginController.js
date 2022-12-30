const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const db = require('../models/db');

const loginController = {};

loginController.authUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const query = `SELECT * FROM users WHERE users.username = $1 AND users.password = $2`;
    const values = [username, password];
    const user = await db.query(query, values);
    if (user) {
      res.locals.auth = user.rows[0];
      return next();
    } else {
      res.locals.auth = false;
      return next();
    }
    // const user = await UserModel.find({ username: username });
    // if (user.length) {
    //   const { password: storedPw } = user[0];
    //   const match = await bcrypt.compare(password, storedPw);
    //   if (match) {
    //     res.locals.auth = user[0];
    //     return next();
    //   }
    // } else {
    //   res.locals.auth = false;
    //   return next();
    // }
  } catch (error) {
    return next({
      log: 'ERROR: Error in loginController.authUser',
      msg: { err: 'ERROR: Error in loginController.authUser' },
    });
  }
};

module.exports = loginController;

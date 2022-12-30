const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const db = require('../models/db');

const authController = {};

authController.verifyUser = async (req, res, next) => {
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
      log: 'ERROR: Error in authController.verifyUser',
      msg: { err: 'ERROR: Error in authController.verifyUser' },
    });
  }
};

authController.addUser = (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds).then(async hash => {
    try {
      const data = await UserModel.create({
        firstName,
        lastName,
        username,
        password: hash,
      });

      res.locals.data = data;
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

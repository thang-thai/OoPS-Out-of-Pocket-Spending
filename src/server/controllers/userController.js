const UserModel = require('../models/userModel');
const db = require('../models/db');
const bcrypt = require('bcrypt');

const userController = {};

userController.addUser = (req, res, next) => {
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
        log: 'ERROR: Error in userController.addUser',
        msg: { err: 'ERROR: Error in userController.addUser' },
      });
    }
  });
};

module.exports = userController;

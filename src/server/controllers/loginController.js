const express = require('express');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const loginController = {};

loginController.authUser = async (req, res, next) => {
  const { username, password } = req.body;
  // const saltRounds = 10;
  try {
    // const hash = await bcrypt.hash(password, saltRounds);
    const user = await UserModel.find({ username: username });
    if (user.length) {
      const { password: storedPw } = user[0];
      const match = await bcrypt.compare(password, storedPw);
      if (match) {
        res.locals.auth = user[0];
        return next();
      }
    } else {
      res.locals.auth = false;
      return next();
    }
  } catch (error) {
    return next({
      log: 'ERROR: Error in loginController.authUser',
      msg: { err: 'ERROR: Error in loginController.authUser' },
    });
  }
};

module.exports = loginController;

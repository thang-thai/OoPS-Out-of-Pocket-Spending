const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

router.post(
  '/add-user',
  userController.addUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

module.exports = router;

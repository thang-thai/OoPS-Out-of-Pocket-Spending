const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const authController = require('../controllers/authController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');

// Verify if user exists
router.post(
  '/verify-user',
  authController.verifyUser,
  // sessionController.isLoggedIn,
  (req, res) => {
    return res.status(200).json(res.locals.auth);
  }
);

// Add new user to DB
router.post(
  '/add-user',
  authController.addUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

module.exports = router;

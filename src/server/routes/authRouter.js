const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Verify if user exists
router.post('/verifyUser', authController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.auth);
});

// Add new user to DB
router.post('/addUser', authController.verifyUser, authController.addUser, (req, res) => {
  return res.status(200).json(res.locals.auth);
});

module.exports = router;

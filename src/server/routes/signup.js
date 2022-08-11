const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/add-user', userController.addUser, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;

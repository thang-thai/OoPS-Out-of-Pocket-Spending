const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post(
  '/authUser',
  loginController.authUser,
  sessionController.isLoggedIn,
  (req, res) => {
    return res.status(200).json(res.locals.auth);
  }
);

module.exports = router;

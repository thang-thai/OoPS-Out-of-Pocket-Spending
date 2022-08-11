const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

router.post('/authUser', loginController.authUser, (req, res) => {
  return res.status(200).json(res.locals.auth);
});

module.exports = router;

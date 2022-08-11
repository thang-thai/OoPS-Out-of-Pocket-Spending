const UserModel = require('../models/userModel');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const randomNum = Math.floor(Math.random() * 100);
  res.cookie('cookie', 'oops').cookie('secret', randomNum);
  return next();
};

cookieController.setSSIDCookie = async (req, res, next) => {
  console.log('IN SSID', res.locals.data._id);
  res.cookie('SSID', res.locals.data._id, { httpOnly: true });
  return next();
};

module.exports = cookieController;

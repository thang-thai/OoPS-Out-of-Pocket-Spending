const UserModel = require('../models/userModel');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const randomNum = Math.floor(Math.random() * 100);
  res.cookie('cookie', 'oops').cookie('secret', randomNum);
  return next();
};

cookieController.setSSIDCookie = async (req, res, next) => {
  const { username } = req.body;
  try {
    const findId = await UserModel.find({ username });
    res.cookie('SSID', findId[0]._id, { httpOnly: true });
    res.locals.ssid = findId[0]._id;
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: error in cookieController.setSSIDCookie',
      msg: { err: 'ERROR: error in cookieController.setSSIDCookie' },
    });
  }
};

module.exports = cookieController;

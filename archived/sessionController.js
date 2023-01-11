const UserModel = require('../models/mongo/userModel');
const SessionModel = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  // COOKIE MADE IT HERE --> TRY TO FIND IT IN MODEL
  const { SSID } = req.cookies;
  SessionModel.findOne({ coookieId: req.cookies.SSID }, (err, session) => {
    if (err) {
      return next({
        log: 'ERROR: Error in userController.addUser',
        msg: { err: 'ERROR: Error in userController.addUser' },
      });
    } else {
      console.log('SESSION LIVE');
      return next();
    }
  });
};

sessionController.startSession = (req, res, next) => {
  SessionModel.create({ cookieId: res.locals.data._id }, (err, session) => {
    if (err) {
      return next({
        log: 'ERROR: Error in userController.addUser',
        msg: { err: 'ERROR: Error in userController.addUser' },
      });
    } else return next();
  });
};

module.exports = sessionController;

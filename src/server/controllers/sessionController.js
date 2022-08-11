const UserModel = require('../models/userModel');
const SessionModel = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  // COOKIE MADE IT HERE --> TRY TO FIND IT IN MODEL
  SessionModel.findOne({ coookieId: req.cookies.SSID }, (err, session) => {
    if (err) {
      return next({
        log: 'ERROR: Error in userController.addUser',
        msg: { err: 'ERROR: Error in userController.addUser' },
      });
    } else if (!session) {
      res.redirect('/');
    } else {
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

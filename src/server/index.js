const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

// require Routers
const apiRouter = require('./routes/api');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

// require Controllers
const cookieController = require('./controllers/cookieController');

// // require Models
// const TransactionModel = require('./models/transactionModel');
// const UserModel = require('./models/userModel');

// // Connect to DB
// mongoose.connect(
//   'mongodb+srv://thangthai:marty123@soloproject.93j556t.mongodb.net/?retryWrites=true&w=majority',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// Server set up
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../../dist')));

// Routes
app.use('/api', apiRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

// Route for main app
app.get('/', cookieController.setCookie, (req, res) => {
  console.log(res.cookie);
  return res.status(200).sendFile(path.resolve(__dirname, '../../dist/bundle'));
});

// Catch all handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, err };
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

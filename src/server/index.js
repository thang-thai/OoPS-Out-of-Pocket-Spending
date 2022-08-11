const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// require Routers
const apiRouter = require('./routes/api');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

// Connect to DB
const TransactionModel = require('./models/transactionModel');
const UserModel = require('./models/userModel');

mongoose.connect(
  'mongodb+srv://thangthai:marty123@soloproject.93j556t.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// Server set up
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', apiRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

// Route for main app
app.get('/', (req, res) => {
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

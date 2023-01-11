const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

// require Routers
const apiRouter = require('./routes/apiRouter');
const authRouter = require('./routes/authRouter');

// Server set up
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../../dist')));

// Routes
app.use('/api', apiRouter);
app.use('/auth', authRouter);

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

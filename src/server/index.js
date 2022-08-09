const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
const TransactionModel = require('./models/transactionModel');
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
app.use('/api', (req, res) => res.send('HELLO FROM SERVER'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

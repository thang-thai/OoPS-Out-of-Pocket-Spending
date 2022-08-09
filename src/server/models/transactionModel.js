const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  transaction: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = {
  Transaction,
};

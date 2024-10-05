const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD',
  },
  paymentIntentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'SUCCEEDED', 'FAILED']
  }
}, {
  timestamps: true  // Automatically handles `createdAt` and `updatedAt`
});

module.exports = mongoose.model("Payment", PaymentSchema);

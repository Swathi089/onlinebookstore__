const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      quantity: Number,
      priceAtPurchase: Number
    }
  ],
  totalAmount: Number,
  paymentIntentId: String, // Stripe
  status: { type: String, default: 'pending' }, // pending, paid, shipped, cancelled
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);

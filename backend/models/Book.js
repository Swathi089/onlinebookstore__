const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  price: { type: Number, required: true },
  category: String,
  bestseller: { type: Boolean, default: false },
  image: String,
  description: String,
  pages: Number,
  publisher: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);

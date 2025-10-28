const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const b = await Book.findById(req.params.id);
  if (!b) return res.status(404).json({ message: 'Not found' });
  res.json(b);
};

exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

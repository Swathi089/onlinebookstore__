// run with: node utils/seedBooks.js
require('dotenv').config();
const connectDB = require('../config/db');
const Book = require('../models/Book');
const books = require('../data/books.json'); // paste the array from your script.js here

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log('Seeded books');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });

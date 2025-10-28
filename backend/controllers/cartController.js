const CartItem = require('../models/CartItem');

exports.getCart = async (req, res) => {
  const cart = await CartItem.findOne({ user: req.user._id }).populate('items.book');
  res.json(cart || { items: [] });
};

exports.addToCart = async (req, res) => {
  const { bookId, quantity = 1 } = req.body;
  let cart = await CartItem.findOne({ user: req.user._id });
  if (!cart) {
    cart = await CartItem.create({ user: req.user._id, items: [{ book: bookId, quantity }] });
    return res.json(cart);
  }
  // if exists, update quantity or push
  const existing = cart.items.find(i => i.book.toString() === bookId);
  if (existing) existing.quantity += quantity;
  else cart.items.push({ book: bookId, quantity });
  cart.updatedAt = Date.now();
  await cart.save();
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { bookId } = req.params;
  let cart = await CartItem.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  cart.items = cart.items.filter(i => i.book.toString() !== bookId);
  await cart.save();
  res.json(cart);
};

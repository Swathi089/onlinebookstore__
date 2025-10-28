const Subscriber = require('../models/Subscriber');

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  const existing = await Subscriber.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Already subscribed' });
  const sub = await Subscriber.create({ email });
  res.status(201).json({ message: 'Subscribed', sub });
};

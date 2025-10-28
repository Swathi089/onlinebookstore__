const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, cartCtrl.getCart);
router.post('/add', protect, cartCtrl.addToCart);
router.delete('/remove/:bookId', protect, cartCtrl.removeFromCart);

module.exports = router;

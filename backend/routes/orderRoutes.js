const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

// All order routes require authentication
router.post('/create', protect, orderCtrl.createOrder);
router.get('/my-orders', protect, orderCtrl.getMyOrders);
router.get('/:id', protect, orderCtrl.getOrderById);

module.exports = router;
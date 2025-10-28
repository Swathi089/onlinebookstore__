const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getBookById);

// Admin-only endpoints: create/update/delete
router.post('/', protect, bookCtrl.createBook);       // restrict in controller by role in production
router.put('/:id', protect, bookCtrl.updateBook);
router.delete('/:id', protect, bookCtrl.deleteBook);

module.exports = router;

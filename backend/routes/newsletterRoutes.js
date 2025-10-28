const express = require('express');
const router = express.Router();
const newsletterCtrl = require('../controllers/newsletterController');

router.post('/subscribe', newsletterCtrl.subscribe);

module.exports = router;

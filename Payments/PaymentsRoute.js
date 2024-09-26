const express = require('express');
const { createPayment } = require('./PaymentsController');

const router = express.Router();

// Payment route
router.post('/createPay', createPayment);

module.exports = router;

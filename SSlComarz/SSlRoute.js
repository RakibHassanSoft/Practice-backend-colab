
const express = require('express');
const { initiatePayment, validatePayment } = require('./PaymentControlers');

const router = express.Router();

// Route to initiate payment
router.post('/initiate', initiatePayment);

// Route to validate payment after completion
router.get('/validate/:transactionId', validatePayment);

module.exports = router;

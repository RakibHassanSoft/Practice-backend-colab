const { createPaymentIntent } = require('./PaymentsService');
const Payment = require('./PaymentsSchema');

const createPayment = async (req, res) => {
  const { amount, userId, currency = 'USD' } = req.body;

  // Validation
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const paymentIntent = await createPaymentIntent(amount, currency);

    const payment = new Payment({
      amount,
      currency,
      userId,
      paymentIntentId: paymentIntent.id,
      status: 'PENDING'
    });

    await payment.save();
    res.status(200).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment', error });
  }
};

module.exports = { createPayment };

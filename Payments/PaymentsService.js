const stripe = require('stripe')(process.env.StripeApiKey);

const createPaymentIntent = async (amount, currency = 'USD') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to create payment intent');
  }
};

module.exports = { createPaymentIntent };

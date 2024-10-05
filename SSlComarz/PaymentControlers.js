const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_password = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false; 

// Initiate Payment
exports.initiatePayment = async (req, res) => {
    const { amount, customerName, customerEmail, success_url, fail_url, cancel_url } = req.body;

    // Unique transaction ID for every payment
    const transactionId = uuidv4();

    const paymentData = {
        store_id:store_id,
        store_passwd: store_password,
        total_amount: amount,
        currency: 'BDT', // Change as per your currency
        tran_id: transactionId,
        success_url,
        fail_url,
        cancel_url,
        cus_name: customerName,
        cus_email: customerEmail,
        // cus_phone: customerPhone,
        shipping_method: 'NO',
        product_name: 'Ecommerce Products',
        product_category: 'General',
        product_profile: 'general',
    };

    try {
        const response = await axios.post(
            `https://${is_live ? 'securepay.sslcommerz.com' : 'sandbox.sslcommerz.com'}/gwprocess/v4/api.php`,
            paymentData
        );

        if (response.data.status === 'SUCCESS') {
            res.status(200).json({
                message: 'Payment initiation successful',
                GatewayPageURL: response.data.GatewayPageURL,
                transactionId
            });
        } else {
            res.status(400).json({ message: 'Payment initiation failed', data: response.data });
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};


// Validate Payment
exports.validatePayment = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const response = await axios.post(
            `https://${is_live ? 'securepay.sslcommerz.com' : 'sandbox.sslcommerz.com'}/validator/api/validationserverAPI.php`,
            null,
            {
                params: {
                    val_id: transactionId,
                    store_id,
                    store_passwd: store_password,
                    v: 1,
                    format: 'json',
                },
            }
        );

        if (response.data.status === 'VALID') {
            res.status(200).json({ message: 'Payment validated', data: response.data });
        } else {
            res.status(400).json({ message: 'Payment validation failed', data: response.data });
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};




const express = require('express');

const { addProduct, getProducts } = require('./ProductController');
const route = express.Router();

// Add  product
route.post('/addProduct', addProduct);

//  get product 
route.get('/getProducts', getProducts);



module.exports = route;
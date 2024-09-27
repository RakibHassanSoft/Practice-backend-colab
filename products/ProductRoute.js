

const express = require('express');

const { addProduct, getProducts } = require('./ProductController');
const { isAdmin } = require('../Admin/isAdmin');
const route = express.Router();

// Add  product
route.post('/addProduct',isAdmin, addProduct);

//  get product 
route.get('/getProducts', getProducts);



module.exports = route;
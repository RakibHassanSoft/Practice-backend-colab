const express = require('express');
const { addToCart, deleteItems, getItems, updateItems } = require('./CartController');
const route = express.Router();

// Add an item to the cart
route.post('/addToCart', addToCart);

// Delete an item from the cart
route.delete('/deleteItems/:id', deleteItems);

// Get all cart items for a user
route.get('/getItems/:userId', getItems);

// Update the quantity of a specific cart item
route.patch('/updateItems/:id', updateItems);

module.exports=route
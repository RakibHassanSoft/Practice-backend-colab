const express = require("express");
// const cookieParser = require("cookie-parser");
const connectDB = require("./Config/dbConfig");
const UserRoute = require("./User/UserRoute");
const ProductRoute = require("./products/ProductRoute");
const CartRoute = require("./Cart/CartRoute");
const SSlRoute= require('./SSlComarz/SSlRoute')
connectDB();
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());
// app.use(cookieParser());

// Home route
app.get("/", (req, res) => {
  res.send("hello Developer");
});

//Routes
app.use("/api/users", UserRoute);
app.use("/api/products", ProductRoute);
app.use("/api/cart", CartRoute);
app.use('/api/payment', SSlRoute);



// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
  

    productName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  
  },
 
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", ProductSchema);

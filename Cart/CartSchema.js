const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },

      productId: {
        type: mongoose.Schema.Types.ObjectId,
    
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, 
        default: 1,
      },
    
  
  totalPrice: {
    type: Number,
    required: true,
   
  },

  
},{
  timestamps:true
});
module.exports = mongoose.model("Cart", CartSchema);

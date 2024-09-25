const Cart = require("../Cart/CartSchema");

//  add  item to cart
exports.addToCart = async (req, res) => {
  const { productId, userId, totalPrice, quantity } = req.body;

  try {
    const existingCartItem = await Cart.aggregate([
      {
        $match: { productId: productId, userId: userId },
      },
    ]);
    if (existingCartItem.length > 0) {
      const updateItems = await Cart.findByIdAndUpdate(
        { productId: productId, userId: userId },
        { $inc: { quantity: quantity } },
        { new: true }
      );
      console.log(updateItems);
      return res.status(200).json(updateItems);
    } else {
      // If it does not exist, create a new cart item
      const newCartItem = new Cart({ productId, userId, totalPrice, quantity });
      console.log(newCartItem);
      await newCartItem.save();
      return res.status(201).json(newCartItem);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  get cart items
exports.getItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("productId");
    console.log(cart);
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteItems = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  update  cart items
exports.updateItems = async (req, res) => {
  const { productId, userId, price, quantity } = req.body;
  const {id}= req.params
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
 id,
      {
        $set: {
          ...(productId && { productId }),
          ...(userId && { userId }),
          ...(price && { price }),
          ...(quantity && { quantity }),
        },
      },
      { new: true }
    );
    console.log(updatedCart);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart" });
  }
};

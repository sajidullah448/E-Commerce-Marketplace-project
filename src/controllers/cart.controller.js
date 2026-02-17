const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user.id })
      .populate("items.productId", "title price images");

    if (!cart) {
      return res.json({ items: [], totalAmount: 0 });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ customerId: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        customerId: req.user.id,
        items: [],
        totalAmount: 0
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price
      });
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await cart.save();
    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user.id });
    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      item => item.productId.toString() !== req.params.productId
    );

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await cart.save();
    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ customerId: req.user.id });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

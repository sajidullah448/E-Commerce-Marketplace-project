const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order
    const order = await Order.create({
      customerId: req.user.id,
      items: cart.items,
      totalAmount: cart.totalAmount,
      status: "pending"
    });

    // Reduce product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear cart
    await Cart.findOneAndDelete({ customerId: req.user.id });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.productId": { $exists: true }
    }).populate("items.productId");

    const sellerOrders = orders.filter(order =>
      order.items.some(
        item => item.productId.sellerId.toString() === req.user.id
      )
    );

    res.json(sellerOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

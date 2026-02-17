const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Admin
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.json({
      totalUsers,
      totalSellers,
      totalCustomers,
      totalProducts,
      totalOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all sellers
 * @route   GET /api/admin/sellers
 * @access  Admin
 */
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" }).select("-password");
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateSellerStatus = async (req, res) => {
  try {
    const { status } = req.body; // true or false

    const seller = await User.findById(req.params.id);
    if (!seller || seller.role !== "seller") {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.isApproved = status;
    await seller.save();

    res.json({
      message: `Seller ${status ? "approved" : "blocked"} successfully`
    });
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

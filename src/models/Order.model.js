const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

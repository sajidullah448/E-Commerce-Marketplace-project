const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  images: [String],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);

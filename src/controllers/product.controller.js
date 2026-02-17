const Product = require("../models/Product.model");

exports.createProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    sellerId: req.user.id
  });
  res.status(201).json(product);
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate("sellerId", "name");
  res.json(products);
};

const Category = require("../models/Category.model");

exports.createCategory = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;

    const category = await Category.create({
      name,
      parentCategory: parentCategory || null
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parentCategory", "name");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate("parentCategory", "name");

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.name = name || category.name;
    category.parentCategory = parentCategory || category.parentCategory;

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

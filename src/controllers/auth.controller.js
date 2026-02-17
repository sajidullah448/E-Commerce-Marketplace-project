const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  res.status(201).json({
    token: generateToken(user._id, user.role),
    user
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user._id, user.role),
    user
  });
};

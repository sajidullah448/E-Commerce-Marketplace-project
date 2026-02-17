const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");


router.post("/register", authController.register);


router.post("/login", authController.login);

router.get("/profile", auth, async (req, res) => {
  try {
    // req.user is set by auth.middleware
    const User = require("../models/User.model");
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

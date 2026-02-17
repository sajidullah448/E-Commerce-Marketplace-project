const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const adminController = require("../controllers/admin.controller");


router.get(
  "/dashboard",
  auth,
  role("admin"),
  adminController.getDashboardStats
);


router.get(
  "/sellers",
  auth,
  role("admin"),
  adminController.getAllSellers
);

router.put(
  "/seller/:id",
  auth,
  role("admin"),
  adminController.updateSellerStatus
);

router.get(
  "/orders",
  auth,
  role("admin"),
  adminController.getAllOrders
);

module.exports = router;

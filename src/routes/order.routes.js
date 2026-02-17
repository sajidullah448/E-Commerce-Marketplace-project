const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const orderController = require("../controllers/order.controller");

router.post("/", auth, role("customer"), orderController.createOrder);
router.get("/my-orders", auth, role("customer"), orderController.getMyOrders);
router.get("/seller", auth, role("seller"), orderController.getSellerOrders);
router.put("/:id/status", auth, role("seller", "admin"), orderController.updateOrderStatus);
router.get("/", auth, role("admin"), orderController.getAllOrders);

module.exports = router;

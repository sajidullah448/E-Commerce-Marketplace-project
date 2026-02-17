const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const cartController = require("../controllers/cart.controller");

router.get("/", auth, cartController.getCart);
router.post("/add", auth, cartController.addToCart);
router.delete("/remove/:productId", auth, cartController.removeFromCart);
router.delete("/clear", auth, cartController.clearCart);

module.exports = router;

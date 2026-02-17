const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/product.controller");

router.post("/", auth, role("seller"), controller.createProduct);
router.get("/", controller.getAllProducts);

module.exports = router;

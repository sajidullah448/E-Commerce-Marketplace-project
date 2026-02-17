const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const categoryController = require("../controllers/category.controller");

router.post("/", auth, role("admin"), categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", auth, role("admin"), categoryController.updateCategory);
router.delete("/:id", auth, role("admin"), categoryController.deleteCategory);

module.exports = router;

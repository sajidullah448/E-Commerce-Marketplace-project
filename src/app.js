const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

app.use(errorHandler);

module.exports = app;

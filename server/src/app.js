const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const healthRoutes = require("./routes/healthRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

module.exports = { app };

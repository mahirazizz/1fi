const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const healthRoutes = require("./routes/healthRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const configuredOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [
  ...new Set([
    ...configuredOrigins,
    "http://localhost:5173",
    "https://1fi-64rf8btpy-mahiraziz.vercel.app",
  ]),
];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

module.exports = { app };

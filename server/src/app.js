const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const healthRoutes = require("./routes/healthRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://1fi-e5v2j5ul6-mahiraziz.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

module.exports = { app };

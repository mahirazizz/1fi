require("dotenv").config();
const mongoose = require("mongoose");
const { app } = require("./app");

const port = Number(process.env.PORT || 5000);
const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("MONGODB_URI is required");

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () =>
      console.log(`OneFi API running on http://localhost:${port}`),
    );
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

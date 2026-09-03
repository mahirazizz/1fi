const express = require("express");
const {
  listProducts,
  getProduct,
  getVariant,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", listProducts);
router.get("/:slug", getProduct);
router.get("/:slug/variants/:variantId", getVariant);

module.exports = router;

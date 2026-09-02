const express = require("express");
const cors = require("cors");
const { z } = require("zod");
const { Product } = require("./models");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9-]+$/);

function serializeProduct(product) {
  const value = product.toObject ? product.toObject() : product;
  return {
    ...value,
    id: value._id.toString(),
    _id: undefined,
    variants: value.variants.map((variant) => ({
      ...variant,
      id: variant._id.toString(),
      _id: undefined,
      emiPlans: variant.emiPlans.map((plan) => ({
        ...plan,
        id: plan._id.toString(),
        _id: undefined,
      })),
    })),
  };
}

app.get("/api/health", (req, res) =>
  res.json({ success: true, data: { status: "ok" } }),
);

app.get("/api/products", async (req, res, next) => {
  try {
    const products = await Product.find({}, "name slug brand variants")
      .sort({ createdAt: 1 })
      .lean();
    res.json({
      success: true,
      data: products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        imageUrl: product.variants[0]?.imageUrl,
        startingPrice: Math.min(
          ...product.variants.map((variant) => variant.price),
        ),
      })),
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/products/:slug", async (req, res, next) => {
  try {
    const slug = slugSchema.parse(req.params.slug);
    const product = await Product.findOne({ slug });
    if (!product)
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    res.json({ success: true, data: serializeProduct(product) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/products/:slug/variants/:variantId", async (req, res, next) => {
  try {
    const slug = slugSchema.parse(req.params.slug);
    const product = await Product.findOne({ slug });
    const variant = product?.variants.id(req.params.variantId);
    if (!variant)
      return res
        .status(404)
        .json({ success: false, error: "Variant not found" });
    res.json({
      success: true,
      data: { ...variant.toObject(), id: variant._id.toString() },
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error instanceof z.ZodError)
    return res
      .status(400)
      .json({ success: false, error: "Invalid route parameter" });
  console.error(error);
  res.status(500).json({ success: false, error: "Something went wrong" });
});

module.exports = { app };

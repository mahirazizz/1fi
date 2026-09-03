const { z } = require("zod");
const { Product } = require("./models");
const { serializeProduct, serializeVariant } = require("../utils/serializers");

const slugSchema = z.string().min(1).max(120).regex(/^[a-z0-9-]+$/);

async function listProducts(req, res, next) {
  try {
    const products = await Product.find(
      {},
      "name slug brand rating soldCount variants",
    )
      .sort({ createdAt: 1 })
      .lean();

    res.json({
      success: true,
      data: products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        imageUrl:
          product.variants[0]?.images?.[0]?.url ||
          product.variants[0]?.imageUrl,
        startingPrice: Math.min(
          ...product.variants.map((variant) => variant.price),
        ),
        rating: product.rating,
        soldCount: product.soldCount,
      })),
    });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const slug = slugSchema.parse(req.params.slug);
    const product = await Product.findOne({ slug });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, data: serializeProduct(product) });
  } catch (error) {
    next(error);
  }
}

async function getVariant(req, res, next) {
  try {
    const slug = slugSchema.parse(req.params.slug);
    const product = await Product.findOne({ slug });
    const variant = product?.variants.id(req.params.variantId);

    if (!variant) {
      return res
        .status(404)
        .json({ success: false, error: "Variant not found" });
    }

    res.json({ success: true, data: serializeVariant(variant) });
  } catch (error) {
    next(error);
  }
}

module.exports = { listProducts, getProduct, getVariant };

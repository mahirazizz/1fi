const mongoose = require("mongoose");

const emiPlanSchema = new mongoose.Schema(
  {
    tenureMonths: {
      type: Number,
      required: true,
    },
    monthlyPayment: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    cashback: {
      type: Number,
      default: 0,
    },
  },
  { _id: true },
);

const variantSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    finish: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    images: {
      type: [
        {
          url: { type: String, required: true },
          alt: { type: String, required: true },
        },
      ],
      default: [],
    },
    mrp: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    emiPlans: {
      type: [emiPlanSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    brand: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionPoints: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    soldCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };

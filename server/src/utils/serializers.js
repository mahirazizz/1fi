function serializeEmiPlan(plan) {
  const value = plan.toObject ? plan.toObject() : plan;
  return {
    ...value,
    id: value._id.toString(),
    _id: undefined,
  };
}

function serializeVariant(variant) {
  const value = variant.toObject ? variant.toObject() : variant;
  return {
    ...value,
    id: value._id.toString(),
    _id: undefined,
    emiPlans: value.emiPlans.map(serializeEmiPlan),
  };
}

function serializeProduct(product) {
  const value = product.toObject ? product.toObject() : product;
  return {
    ...value,
    id: value._id.toString(),
    _id: undefined,
    variants: value.variants.map(serializeVariant),
  };
}

module.exports = { serializeProduct, serializeVariant };

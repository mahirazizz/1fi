const { z } = require("zod");

function errorHandler(error, req, res, next) {
  if (error instanceof z.ZodError) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid route parameter" });
  }

  console.error(error);
  res.status(500).json({ success: false, error: "Something went wrong" });
}

module.exports = errorHandler;

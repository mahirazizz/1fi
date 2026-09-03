const mongoose = require("mongoose");
const serverless = require("serverless-http");
const { app } = require("../../src/app");

let connectionPromise;

function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI).catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }

  return connectionPromise;
}

const expressHandler = serverless(app);

exports.handler = async (event, context) => {
  await connectToDatabase();
  return expressHandler(event, context);
};

"use strict";
const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname +
  "../../../database/config/mongo.config.json")[env];

mongoose.set("strictQuery", false);

const connectMongoDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.");
    return;
  }
  mongoose.connect(config.connectionString);
};

module.exports = connectMongoDB;

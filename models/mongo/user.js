"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

let dataSet = mongoose.model.User || mongoose.model("User", userSchema);
module.exports = dataSet;

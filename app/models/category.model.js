const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    title: String,
    description: String
  })
);

module.exports = Category;
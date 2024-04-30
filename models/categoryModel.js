const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: [true, "category name must be unique"],
      minLength: [3, "too short category name"],
      maxLength: [32, "too long category name"],
    },
    // a and b => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;

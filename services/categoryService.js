const slugify = require("slugify");
const CategoryModel = require("../models/categoryModel");
exports.getCategories = async (req, res) => {
  //get all categories
  CategoryModel.find({}).then((categories) => {
    res.status(200).json(categories);
  });
};
exports.createCategories = async (req, res) => {
  const name = req.body.name;
  CategoryModel.create({ name, slug: slugify(name) })
    .then((category) => {
      res.status(200).json(category); // Removed the extra object syntax
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

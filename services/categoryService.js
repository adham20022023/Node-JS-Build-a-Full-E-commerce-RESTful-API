const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const appError = require("../utils/Api-error");

// @ desc Get all categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  // console.log(req.query);
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const categories = await Category.find()
    .select("-__v") // exclude __v
    .skip(skip)
    .limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
});
// @ desc Get single category
// @ route GET /api/v1/categories/:id
// @ access Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id).select("-__v");
  if (!category) {
    // res.status(404).json({ msg: `No category found with id ${id}` });
    return next(new appError(`No category found with id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
// @desc Create new category
// @route POST /api/v1/categories
// @access Private
exports.createCategories = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc Update category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const name = req.body.name;
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    {
      new: true, // after update
      runValidators: true,
    }
  );
  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ data: category });
});

// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete({ _id: id });
  if (!category) {
    res.status(404).json({ message: "Category not found" });
  } else {
    res.status(204).send();
  }
});

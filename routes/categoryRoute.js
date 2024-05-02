const express = require("express");

const {
  getCategories,
  createCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const router = express.Router();

router.route("/").get(getCategories).post(createCategories);
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = router;

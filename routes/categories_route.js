const express = require("express");
const router = express.Router();
const CategoriesController = require("../controller/categories");

router.get("/all", CategoriesController.getAllCategories);
router.post("/create", CategoriesController.createCategories);
router.patch("/update/:id", CategoriesController.updateCategories);
router.delete("/delete/:id", CategoriesController.deleteCategories);

module.exports = router;

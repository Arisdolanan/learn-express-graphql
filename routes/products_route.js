const express = require("express");
const router = express.Router();
const ProductsController = require("../controller/products");

router.get("/all", ProductsController.getAllProducts);
router.post("/create", ProductsController.createProducts);
router.patch("/update/:id", ProductsController.updateProducts);
router.delete("/delete/:id", ProductsController.deleteProducts);

module.exports = router;

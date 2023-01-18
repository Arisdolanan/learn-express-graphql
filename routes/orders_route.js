const express = require("express");
const router = express.Router();
const OrdersController = require("../controller/orders");

router.get("/all", OrdersController.getAllOrders);
router.post("/create", OrdersController.createOrders);
router.patch("/update/:id", OrdersController.updateOrders);
router.delete("/delete/:id", OrdersController.deleteOrders);

router.get("/detail/all", OrdersController.getAllOrdersDetail);
router.post("/detail/create", OrdersController.createOrdersDetail);

module.exports = router;

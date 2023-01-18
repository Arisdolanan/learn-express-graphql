const express = require("express");
const router = express.Router();
const MstUsersController = require("../controller/mstusers");

router.get("/all", MstUsersController.getAllMstUsers);
router.get("/all/:id", MstUsersController.getAllMstUsersId);
router.post("/create", MstUsersController.createMstUser);
router.patch("/update/:id", MstUsersController.updateMstUser);
router.delete("/delete/:id", MstUsersController.deleteMstUser);

module.exports = router;

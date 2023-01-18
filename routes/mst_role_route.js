const express = require("express");
const router = express.Router();
const MstRoleUsersController = require("../controller/mstrole");

router.get("/all", MstRoleUsersController.getAllMstRoleUser);
router.post("/create", MstRoleUsersController.createMstRoleUser);
router.patch("/update/:id", MstRoleUsersController.updateMstRoleUser);
router.delete("/delete/:id", MstRoleUsersController.deleteMstRoleUser);

module.exports = router;

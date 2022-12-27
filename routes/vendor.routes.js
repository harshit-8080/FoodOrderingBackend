const express = require("express");
const vendorController = require("../controllers/vendor.controller");
const {auth} = require("../middlewares/auth");

const VendorRouter = express.Router();

VendorRouter.post("/login", vendorController.login);

VendorRouter.get("/profile", auth, vendorController.getProfile);

VendorRouter.patch("/profile", auth, vendorController.updateProfile);

VendorRouter.patch("/service", auth, vendorController.updateService);

module.exports = VendorRouter;
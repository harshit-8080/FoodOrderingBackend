const express = require("express");
const vendorController = require("../controllers/vendor.controller");


const VendorRouter = express.Router();

VendorRouter.post("/login", vendorController.login);


module.exports = VendorRouter;
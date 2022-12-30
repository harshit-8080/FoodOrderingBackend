const express = require("express");

const shoppingController = require("../controllers/shopping.controller");

const ShoppingRouter = express.Router();


ShoppingRouter.get("/search/pincode/:pincode",shoppingController.searchByPincode);

ShoppingRouter.get("/search/vendor/:vendorId",shoppingController.searchByVendorId);

module.exports = ShoppingRouter;
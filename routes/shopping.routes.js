const express = require("express");

const shoppingController = require("../controllers/shopping.controller");

const ShoppingRouter = express.Router();

ShoppingRouter.get("/search/vendor/:vendorId", shoppingController.getVendor);

ShoppingRouter.get(
  "/search/food/pincode/:pincode",
  shoppingController.searchFoodInYourArea
);

ShoppingRouter.get(
  "/search/food/vendor/:vendorId",
  shoppingController.searchFoodByVendorId
);

ShoppingRouter.get(
  "/search/topVendor/pincode/:pincode",
  shoppingController.getTopVendors
);

module.exports = ShoppingRouter;

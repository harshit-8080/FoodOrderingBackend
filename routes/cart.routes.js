const express = require("express");
const { auth } = require("../middlewares/auth");
const cartController = require("../controllers/cart.controller");

const CartRouter = express.Router();

CartRouter.post("/add", auth, cartController.addToCart);

CartRouter.get("/detail", auth, cartController.getCart);

CartRouter.delete("/", auth, cartController.deleteCart);

module.exports = CartRouter;

const express = require("express");
const OrderComtroller = require("../controllers/order.controller");
const {auth} = require("../middlewares/auth");

const OrderRouter = express.Router();

OrderRouter.post("/create", auth, OrderComtroller.createOrder);

OrderRouter.get("/orders", auth, OrderComtroller.getAllOrders);

OrderRouter.get("/:orderId", auth, OrderComtroller.getOrder);


module.exports = OrderRouter;
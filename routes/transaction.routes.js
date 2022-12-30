const express = require("express");
const {auth} = require("../middlewares/auth");
const TransactionController = require("../controllers/transaction.controller");

const TransactionRouter = express.Router();


TransactionRouter.post("/payment", auth, TransactionController.createPayment);

TransactionRouter.delete("/", auth, TransactionController.deleteAll); // for dev use

// TransactionRouter.get("/vendors", TransactionController.getVendors);

// TransactionRouter.get("/vendor/:id", TransactionController.getVendorByID);

TransactionRouter.get("/:id", auth, TransactionController.getTransaction); 


module.exports = TransactionRouter;
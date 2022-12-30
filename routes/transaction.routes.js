const express = require("express");
const {auth} = require("../middlewares/auth");
const TransactionController = require("../controllers/transaction.controller");

const TransactionRouter = express.Router();


TransactionRouter.post("/payment", auth, TransactionController.createPayment);

// TransactionRouter.delete("/", auth, TransactionController.deleteAll); // for dev use

TransactionRouter.get("/vendor/:vendorId", TransactionController.getTransactionAmountByVendorByID);

TransactionRouter.get("/:id", auth, TransactionController.getTransaction); 


module.exports = TransactionRouter;
const userServices = require("../services/user.service");
const {
  OrderModel,
  userModel,
  foodModel,
  TransactionModel,
} = require("../models/index");

exports.createPayment = async (req, res) => {
  try {
    const user = await userServices.getUserByEmail(req.email);
    if (user) {
      const payment = {
        userId: user._id,
        vendorId: req.body.vendorId,
        amount: req.body.amount,
        paymentStatus: "pending",
        paymentMode: "COD",
      };

      const result = await TransactionModel.create(payment);

      return res.json({
        response: result,
      });
    } else {
      return res.json({
        response: "Invalid Server",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "internal server error",
    });
  }
};

// for dev purpose
exports.deleteAll = async (req, res) => {
  try {
    const response = await TransactionModel.deleteMany({ paymentMode: "COD" });
    return res.json({
      response: response,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "internal server error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id);
    return res.json({
      response: transaction,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};

exports.getTransactionAmountByVendorByID = async (req, res) => {
  try {
    const transaction = await TransactionModel.find({
      vendorId: req.params.vendorId,
    });

    let totalTransactionAmount = transaction.reduce((sum, t) => {
      sum = sum + Number(t.amount);
      return sum;
    }, 0);

    // console.log(totalTransactionAmount);
    return res.json({
      response: transaction,
      totalAmount: totalTransactionAmount,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};

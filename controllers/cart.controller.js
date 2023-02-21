const { userModel, foodModel } = require("../models/index");
const passwordHelper = require("../utils/passwordHelper");
const tokenHelper = require("../utils/tokenHelper");
const otpHelper = require("../utils/otpHelper");
const userServices = require("../services/user.service");

exports.addToCart = async (req, res) => {
  try {
    const user = await userServices.getUserByEmail(req.email);
    if (user) {
      const foodId = req.body.foodId;
      const unit = req.body.unit;

      const food = await foodModel.findById(foodId);

      if (user.carts.length > 0) {
        let exitFood = false;
        user.carts.forEach((f) => {
          if (f.food.toString() == food._id) {
            if (unit > 0) {
              f.unit = unit;
            } else {
              user.carts.remove(f);
            }
            exitFood = true;
          }
        });
        if (!exitFood) {
          user.carts.push({ food: foodId, unit: unit });
        }
      } else {
        user.carts.push({ food: foodId, unit: unit });
      }

      await user.save();

      const cartResult = await userModel
        .findOne({ email: req.email })
        .populate("carts.food");

      return res.json({
        response: cartResult.carts,
      });
    } else {
      return res.json({
        response: "Invalid user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "internal server error",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await userServices.getUserByEmail(req.email);
    if (user) {
      const user = await userModel
        .findOne({ email: req.email })
        .populate("carts.food");

      return res.json({
        response: user.carts,
      });
    } else {
      return res.json({
        response: "Invalid user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "internal server error",
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const user = await userServices.getUserByEmail(req.email);
    if (user) {
      user.carts = [];
      await user.save();

      return res.json({
        response: user.carts,
      });
    } else {
      return res.json({
        response: "Invalid user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "internal server error",
    });
  }
};

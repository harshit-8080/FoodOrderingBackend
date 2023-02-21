const { userModel } = require("../models/index");

exports.getUserByID = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    return user;
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "internal server error",
    });
  }
};

exports.getUserByEmail = async (userEmail) => {
  try {
    const user = await userModel.findOne({ email: userEmail });

    return user;
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "internal server error",
    });
  }
};

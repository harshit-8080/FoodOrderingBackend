const { vendorModel } = require("../models/index");

exports.getVendorByID = async (vendorId) => {
  try {
    const vendor = await vendorModel.findById(vendorId);

    return vendor;
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "internal server error",
    });
  }
};

exports.getVendorByEmail = async (vendorEmail) => {
  try {
    const vendor = await vendorModel.findOne({ email: vendorEmail });

    return vendor;
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "internal server error",
    });
  }
};

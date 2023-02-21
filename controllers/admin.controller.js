const { vendorModel } = require("../models/index");
const passwordHelper = require("../utils/passwordHelper");
exports.createVendor = async (req, res) => {
  try {
    const vendor = {
      name: req.body.name,
      ownerName: req.body.ownerName,
      foodType: req.body.foodType,
      pincode: req.body.pincode,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      serviceAvailable: false,
      coverImages: [],
      rating: 0,
      profilePhoto: req.body.profilePhoto,
    };

    const checkVendor = await vendorModel.findOne({ email: vendor.email });

    if (checkVendor) {
      return res.json({
        response: "Vendor is already on the app",
      });
    }

    const salt = passwordHelper.generateSalt();
    vendor.password = passwordHelper.hashPassword(vendor.password, salt);
    vendor.salt = salt;

    const response = await vendorModel.create(vendor);

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

exports.getVendors = async (req, res) => {
  try {
    const vendors = await vendorModel.find();
    return res.json({
      response: vendors,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "internal server error",
    });
  }
};

exports.getVendorByID = async (req, res) => {
  try {
    const vendor = await vendorModel.findById(req.params.id);

    return res.json({
      response: vendor,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "internal server error",
    });
  }
};

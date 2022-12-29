const express = require("express");
const vendorController = require("../controllers/vendor.controller");
const {auth} = require("../middlewares/auth");
const multer = require("multer");

const VendorRouter = express.Router();

const storage = multer.diskStorage({
    destination: 'images', 
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString()+file.originalname);
    }
  })
  
const upload = multer({ storage: storage })



VendorRouter.post("/login", vendorController.login);

VendorRouter.get("/profile", auth, vendorController.getProfile);

VendorRouter.patch("/profile", auth, vendorController.updateProfile);

VendorRouter.patch("/service", auth, vendorController.updateService);

VendorRouter.post("/food", auth, vendorController.addFood);

VendorRouter.get("/foods", auth, vendorController.getFood);

VendorRouter.post("/test", upload.single("images"), vendorController.test);

module.exports = VendorRouter;
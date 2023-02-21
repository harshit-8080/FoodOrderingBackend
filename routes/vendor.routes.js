const express = require("express");
const vendorController = require("../controllers/vendor.controller");
const { auth } = require("../middlewares/auth");
const multer = require("multer");

const VendorRouter = express.Router();

const storage = multer.diskStorage({
  destination: "images",
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}_profilePhoto_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

VendorRouter.post("/login", vendorController.login);

VendorRouter.get("/profile", auth, vendorController.getProfile);

VendorRouter.patch("/profile", auth, vendorController.updateProfile);

VendorRouter.patch("/service", auth, vendorController.updateService);

VendorRouter.post("/food", auth, vendorController.addFood);

VendorRouter.get("/foods", auth, vendorController.getFood);

VendorRouter.patch(
  "/upload/profile",
  auth,
  upload.single("image"),
  vendorController.uploadProfile
);

VendorRouter.patch(
  "/upload/food/:foodId",
  auth,
  upload.array("images"),
  vendorController.uploadFoods
);

VendorRouter.patch(
  "/upload/food/:foodId",
  auth,
  upload.array("images"),
  vendorController.uploadFoods
);

VendorRouter.get("/orders", auth, vendorController.getOrders);

VendorRouter.get("/order/:orderId", auth, vendorController.getOrder);

VendorRouter.patch(
  "/order/:orderId/process",
  auth,
  vendorController.updateOrderStatus
);

module.exports = VendorRouter;

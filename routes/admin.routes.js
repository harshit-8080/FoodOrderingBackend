const express = require("express");

const adminController = require("../controllers/admin.controller");

const AdminRouter = express.Router();

AdminRouter.post("/vendor", adminController.createVendor);

AdminRouter.get("/vendors", adminController.getVendors);

AdminRouter.get("/vendor/:id", adminController.getVendorByID);

module.exports = AdminRouter;

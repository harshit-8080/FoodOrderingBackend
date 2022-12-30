const express = require("express");
const {auth} = require("../middlewares/auth");

const UserController = require("../controllers/user.controller");

const UserRouter = express.Router();


UserRouter.post("/signup", UserController.signUpUser);

UserRouter.post("/login", UserController.loginUser);

UserRouter.get("/users", auth, UserController.getAllUsers);

UserRouter.post("/verify", auth,UserController.verifyUser);

UserRouter.get("/otp", auth,UserController.requestOtp);

UserRouter.get("/", auth, UserController.getUser);

UserRouter.get("/:user", auth, UserController.getUser);

UserRouter.patch("/update", auth, UserController.updateProfile);

module.exports = UserRouter;
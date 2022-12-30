const express = require("express");

const UserController = require("../controllers/user.controller");

const UserRouter = express.Router();


UserRouter.post("/signup", UserController.signUpUser);

UserRouter.get("/loginin", UserController.loginUser);

UserRouter.get("/users", UserController.getAllUsers);

// UserRouter.get("/vendor/:id", UserController.verifyUser);


module.exports = UserRouter;
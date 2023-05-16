const express = require("express");
const userRouter = express.Router();
const {getAllUsersController, getUserController, createUserController, deleteUserController, updateUserController} = require("../controller/userController")

userRouter.get("/",getAllUsersController)

userRouter.get("/:userId", getUserController)

userRouter.post("/", createUserController)

userRouter.delete("/:userId", deleteUserController)

userRouter.put("/:userId", updateUserController)

module.exports = userRouter;
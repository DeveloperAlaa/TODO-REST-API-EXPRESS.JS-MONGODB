const express = require("express");
const route = express.Router();

const Joi = require("joi");

const {
  signup,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllUsers,
  login,
} = require("../controllers/users.controller");

const {
  signupValidator,
  loginValidator,
} = require("../middlewares/authenticationValidator");

// import the user model
const User = require("../models/user");

const AppError = require("../utils/AppError");

route.get("/", getAllUsers);

route.post("/", signupValidator, signup);

// validation for the data comming from the client using joi for the login resource

route.post("/login", loginValidator, login);

route.get("/:id", getSingleUser);

route.patch("/:id", updateUser);

route.delete("/:id", deleteUser);

module.exports = route;

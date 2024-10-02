const express = require("express");
const route = express.Router();

const {
  signup,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllUsers,
  login,
} = require("../controllers/authentication.controller");

// import the user model
const User = require("../models/user");

const AppError = require("../utils/AppError");

route
  .get("/", getAllUsers)

  .post("/", signup)

  .post("/login", login)

  .get("/:id", getSingleUser)

  .patch("/:id", updateUser)

  .delete("/:id", deleteUser);

module.exports = route;

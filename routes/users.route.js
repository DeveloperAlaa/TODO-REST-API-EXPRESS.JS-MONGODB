const express = require("express");
const User = require("../models/user");
const route = express.Router();

const AppError = require("../utils/AppError");

route
  .get("/", async (req, res, next) => {
    // try {
    const users = await User.find({});
    res.send(users);
    // } catch (err) {
    //   next(err);
    // }
  })

  .post("/", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError("Email and password are required.", 400));

    // firt way of creating a new document
    // const newUser = await User.create({email, password})

    // second way of creating a new document
    const newUser = new User({ email, password });
    await newUser.save();

    // if you'r planning to send the created, you have to serialize the password
    // newUser.password = undefined
    // res.send(newUser);

    res.send("User has been created successfully");
  });

route
  .get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return next(new AppError("User was not found.", 404));

    res.send(user);
  })

  .patch("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { email, password });

    if (!user) return next(new AppError("User was not found.", 404));

    res.send("User has been updated successfully.");
  })

  .delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) return next(new AppError("User was not found.", 404));

    res.send("User has been deleted successfully.");
  });

module.exports = route;

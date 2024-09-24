const express = require("express");
const User = require("../models/user");
const route = express.Router();

route
  .get("/", async (req, res, next) => {
    const users = await User.find({});
    res.send(users);
  })

  .post("/", async (req, res, next) => {
    const { email, password } = req.body;
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
    res.send(user);
  })

  .patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    await User.findByIdAndUpdate(id, { email, password });
    res.send("User has been updated successfully.");
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.send("User has been deleted successfully.");
  });

module.exports = route;

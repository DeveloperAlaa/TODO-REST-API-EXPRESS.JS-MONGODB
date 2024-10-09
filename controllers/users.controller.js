// import the user model
const User = require("../models/user");

// import bcrypt to encrypt sensitive data
const bcrypt = require("bcrypt");

const AppError = require("../utils/AppError");

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  // this block of code is now useless as we use joi to validate the data comming from the client in the middleware
  // if (!email || !password)
  //   return next(new AppError("Email and password are required.", 400));

  // we pass the data, then the salt to be used to hash the password.
  // if specified as a number then a salt will be generated with the specified number of rounds and used
  // const hashedPassword = await bcrypt.hash(password, 10);
  // this step of hashing the password is placed in a middleware in the user model

  // firt way of creating a new document
  // const newUser = await User.create({email, hashedPassword})

  // second way of creating a new document
  const newUser = new User({ email, password });
  await newUser.save();

  // if you're sending the new created user, you have to serialize the password bfore sending it to the client for security
  newUser.password = undefined;

  res.send(newUser);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // this block of code is now useless as we use joi to validate the data comming from the client in the middleware
  // if (!email || !password)
  //   return next(new AppError("Email and password are required.", 400));

  // .select("+password") -> Specifies which document fields to include or exclude (also known as the query "projection")
  // we use .select("+password") as we added the property selected: false in the user schema so we override schema-level
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("Invalid credentials.", 404));

  const isChecked = await user.checkPassword(password);
  if (!isChecked) return next(new AppError("Invalid credentials.", 404));

  // if you're sending the user, you have to serialize the password bfore sending it to the client for security
  user.password = undefined;

  res.send(user);
};

const getAllUsers = async (req, res, next) => {
  // try {
  const users = await User.find({});
  res.send(users);
  // } catch (err) {
  //   next(err);
  // }
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) return next(new AppError("User was not found.", 404));

  res.send(user);
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { email, password } = req.body;
  let user = await User.findOne({ _id: id }).select("+password");
  if (!user) return next(new AppError("User was not found.", 404));

  user.email = email || user.email;
  user.password = password || user.password;
  await user.save();

  user.password = undefined;

  res.send(user);
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) return next(new AppError("User was not found.", 404));

  res.send("User has been deleted successfully.");
};

module.exports = {
  signup,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllUsers,
  login,
};




Buffer.from("eyJhbGciOiJIUzI1Nils1nR5cC161kpXVCJ9.eyJpZCI6MX0", "base64").toString() 
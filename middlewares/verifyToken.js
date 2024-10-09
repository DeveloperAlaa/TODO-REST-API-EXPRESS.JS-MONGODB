const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


module.exports = async (req, res, next) => {
  // get the token
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please provide a vaild token", 400));
  // verify the token returns a payload. we destructure the id from it
  const { id } = jwt.verify(token, "mySecret");
  // we get the user document using the id
  const user = await User.findById(id);
  if (!user) return next(new AppError("User was not found token", 404));
  // we attatch the user to the request object
  console.log("user----> ", user)
  req.user = user;
  next();
};

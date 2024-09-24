const mongoose = require("mongoose");

// connect to a local database
mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.log(err));

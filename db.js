const mongoose = require("mongoose");

// connect to a local database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.log(err));

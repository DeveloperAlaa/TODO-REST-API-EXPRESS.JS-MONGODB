const mongoose = require("mongoose");
const { Schema } = mongoose;

// create a user schema -> specify how a single user object will be
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// create a user model -> create a user collection in the users db
// in the model method we pass the collection name and the schema.
// the collection name will named as the plural lowercase of the passed name
const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");

// create a user schema -> specify how a single user object will be
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    // immutable: true,
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

// mongoose middlewares let us performe some logic before and after creating or updating or even deleting a document
// for example instead of hashing the password in the signup controller we can hash it in a middleware before saving the document
userSchema.pre("save", async function () {
  const currentDocument = this;
  if (currentDocument.isModified("password")) {
    const hashedPassword = await bcrypt.hash(currentDocument.password, 10);
    currentDocument.password = hashedPassword;
  }
});

// we can define our own instance methods in the userSchema
userSchema.methods.checkPassword = async function (password) {
  const currentDocument = this;
  const isChecked = await bcrypt.compare(password, currentDocument.password);
  return isChecked;
};

// create a user model -> create a user collection in the users db
// in the model method we pass the collection name and the schema.
// the collection name will named as the plural lowercase of the passed name
const User = mongoose.model("User", userSchema);
module.exports = User;

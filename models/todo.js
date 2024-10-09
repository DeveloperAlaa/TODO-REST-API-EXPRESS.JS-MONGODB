const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["todo", "doing", "done"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

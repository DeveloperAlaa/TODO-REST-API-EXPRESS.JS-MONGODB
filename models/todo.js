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
});


const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo
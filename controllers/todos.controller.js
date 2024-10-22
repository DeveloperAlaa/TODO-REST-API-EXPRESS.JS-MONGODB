const Todo = require("../models/todo");
const AppError = require("../utils/AppError");

const getAllTodos = async (req, res, next) => {
  const userId = req.user._id;
  // .populate() returns all the fields of the user id
  const todos = await Todo.find({ user: userId }).populate("user"); // returns all the user fields
  // const todos = await Todo.find({user: userId}).populate({
  //   path: "user",
  //   select: "email createdAt" // returns just the 'email' and 'createdAt' fields
  // });
  res.send(todos);
};

const createTodo = async (req, res, next) => {
  const userId = req.user._id;
  const { title, content, status } = req.body;

  const newTodo = new Todo({ title, content, status, user: userId });
  await newTodo.save();
  res.send(newTodo);
};

const getSingleTodo = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const todo = await Todo.find({ _id: id, user: userId });

  if (!todo) return next(new AppError("Todo was not found", 404));

  res.send(todo);
};

const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, status } = req.body;
  const userId = req.user._id;
  let todo = await Todo.findOne({ _id: id, user: userId });

  if (!todo) return next(new AppError("Todo was not found", 404));

  todo.title = title || todo.title;
  todo.content = content || todo.content;
  todo.status = status || todo.status;

  await todo.save();

  res.send(todo);
};

const deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id
  const todo = await Todo.findOneAndDelete({_id: id, user: userId});

  if (!todo) return next(new AppError("Todo was not found", 404));

  res.send(todo);
};

module.exports = {
  getAllTodos,
  createTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};

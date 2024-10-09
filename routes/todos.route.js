const express = require("express");
const route = express.Router();

const {
  getAllTodos,
  createTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos.controller");

const todoValidator = require("../middlewares/todoValidator");

const verifyToken = require("../middlewares/verifyToken");

route.get("/", verifyToken, getAllTodos);

route.post("/", verifyToken, todoValidator, createTodo);

route.get("/:id", getSingleTodo);

route.patch("/:id", updateTodo);

route.delete("/:id", deleteTodo);

module.exports = route;

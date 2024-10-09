const express = require("express");
const route = express.Router();

const {
  getAllTodos,
  createTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/users.controller");

route.get("/", getAllTodos);

route.post("/", createTodo);

route.get("/:id", getSingleTodo);

route.patch("/:id", updateTodo);

route.delete("/:id", deleteTodo);

module.exports = route;

const express = require("express");
const app = express();

const port = 6060;

// it's a package that automatically handles errors and pass it to the global error handler
require("express-async-errors");

const morgan = require("morgan");

// import  mongoose ODM
// const mongoose = require("mongoose");

require("./db");

const usersRoute = require("./routes/users.route");
const todosRoute = require("./routes/todos.route");

// a middleware that serves static files from inside a root directory
// app.use(express.static("public"));

// a middleware that parses incoming requests with json payloads
app.use(express.json());

// a middleware that parses incoming requests with urlencoded payloads (from the browser)
app.use(express.urlencoded({extended: false}));

// for logging
app.use(morgan("combined"));

// users resource
app.use("/users", usersRoute);

// todos resource
app.use("/todos", todosRoute);

// global error handler
app.use((err, req, res, next) => {
  console.log("Error ocurred:- ", err);

  const statusCode = err?.statusCode || 500;
  const errorMessage = err?.message || "Internal Server Error.";
  const errors = err?.errors || [];

  res.status(statusCode).send({
    status: statusCode,
    message: errorMessage,
    errors: errors,
  });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

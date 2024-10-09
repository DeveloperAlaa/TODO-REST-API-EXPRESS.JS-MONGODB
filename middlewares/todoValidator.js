const Joi = require("joi");
const AppError = require("../utils/AppError");

const todoSchema = Joi.object({
  title: Joi.string().min(5).max(30).required(),
  content: Joi.string().min(5).required(),
  status: Joi.string().required(),
});

const todoValidator = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);

  if (error) return next(new AppError(error.message, 400, error.details));
  next();
};

module.exports = todoValidator;

const Joi = require('joi');

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
  matric: Joi.string().length(11).required(),
});

module.exports = {
  authSchema,
};

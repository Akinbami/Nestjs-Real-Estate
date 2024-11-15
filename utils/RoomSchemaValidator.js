const Joi = require('joi');

const roomSchema = Joi.object({
    type: Joi.string().required(),
    number: Joi.string().required(),
    floor: Joi.string().required(), 
    specialty: Joi.boolean().required(), 
});

module.exports = {
    roomSchema,
};

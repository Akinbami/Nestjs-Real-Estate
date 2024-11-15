const Joi = require('joi');

const applicationSchema = Joi.object({
    room_type: Joi.string().required(),
    room_type_year: Joi.number().required(),
    health_condition: Joi.boolean().required(), 
    report: Joi.string().allow(null, ''),
    select_roommate: Joi.boolean().required(), 
    roommate_name: Joi.string().allow(null, ''),
    paid: Joi.boolean().required(),
    payment_reference: Joi.string().required(),
    amount: Joi.number().required()
});

module.exports = {
    applicationSchema,
};

const joi = require("joi");

const stringSchema = joi.string().required();
const isoDateSchema = stringSchema.isoDate();
const numericSchema = joi.number().raw();
const getErrorSchema = joi.object({
	message: stringSchema
});

module.exports = { stringSchema, isoDateSchema, numericSchema, getErrorSchema };

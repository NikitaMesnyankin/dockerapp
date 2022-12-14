const joi = require("joi");
const { stringSchema, numericSchema, isoDateSchema, getErrorSchema } = require("./general");

const userSchema = joi.object({
	id: numericSchema,
	email: stringSchema,
	login: stringSchema,
	password: stringSchema,
	surname: stringSchema,
	name: stringSchema,
	contact: stringSchema,
	role: stringSchema.optional(),
	point_id: numericSchema.required()
}).unknown(false);

const phoneSchema = joi.object({
	id: numericSchema,
	model: stringSchema,
	brand: stringSchema,
	stock: numericSchema.required()
}).unknown(false);

const pointSchema = joi.object({
	id: numericSchema,
	city: stringSchema,
	street: stringSchema,
	building: stringSchema,
	apartment: stringSchema
}).unknown(false);

module.exports = { userSchema, phoneSchema, pointSchema };
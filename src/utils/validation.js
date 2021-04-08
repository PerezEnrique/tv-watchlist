const Joi = require("joi");

function validateUserData(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	return schema.validate(userData, { abortEarly: false });
}

module.exports = { validateUserData };

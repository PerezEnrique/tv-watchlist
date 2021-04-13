export function validateUserData(data, schema) {
	const errors = {};

	const { error } = schema.validate(data, { abortEarly: false });
	if (error) {
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
	}

	if (data.confirmPassword && data.confirmPassword !== data.password) {
		errors["confirmPassword"] = "Passwords do not match";
	}

	return errors;
}

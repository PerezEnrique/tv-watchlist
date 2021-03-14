module.exports = function (ex, req, res, next) {
	// For expected errors
	if (ex.name === "ValidationError") {
		const errorMessages = Object.values(ex.errors).map(field => field.message);
		return res.status(400).json({ success: false, errorMessage: errorMessages });
	}

	// For unexpected errors
	return res
		.status(500)
		.json({ success: false, errorMessage: `Server error ocurred. ${ex}` });
};

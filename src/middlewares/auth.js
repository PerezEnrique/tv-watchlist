module.exports = async function (req, res, next) {
	if (!req.session.user)
		return res
			.status(401)
			.json({ success: false, errorMessage: "Access denied, please log in" });
	next();
};

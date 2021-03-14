module.exports = function (user) {
	return {
		_id: user._id,
		email: user.email,
		watchlist: user.watchlist,
	};
};

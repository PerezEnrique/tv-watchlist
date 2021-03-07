module.exports = function (user) {
	return {
		email: user.email,
		watchlist: user.watchlist,
	};
};

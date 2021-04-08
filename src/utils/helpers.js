function sessionizeUser(user) {
	return {
		_id: user._id,
		email: user.email,
		watchlist: user.watchlist,
	};
}

module.exports = { sessionizeUser };

export function objectIsEmpty(object) {
	return Object.keys(object).length === 0;
}

export function showAlreadyOnWatchlist(currentUser, showId) {
	return currentUser.watchlist.find(show => show.id === showId);
}

import React from "react";
import { AuthContext } from "../contexts/authContext";
import Card from "../components/Card";

class WatchlistPage extends React.Component {
	static contextType = AuthContext;

	handleWatchList = async show => {
		await this.context.updateWatchlist(show);
	};

	render() {
		const { watchlist } = this.context.currentUser;

		return (
			<main className="main-container" role="main">
				<h1 className="main-title">Currently on your watchlist:</h1>
				<section className="shows">
					{watchlist.length !== 0 ? (
						watchlist.map(show => (
							<Card kew={show.id} show={show} handleWatchlist={this.handleWatchList} />
						))
					) : (
						<h2>You haven't added any show yet</h2>
					)}
				</section>
			</main>
		);
	}
}

export default WatchlistPage;

import React from "react";
import http from "../services/httpServices";
import config from "../config/config.json";

import SearchForm from "../components/SearchForm";
import NoShow from "../components/NoShow";
import Card from "../components/Card";
import Loader from "../components/Loader";

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			shows: [],
			loading: false,
		};
	}

	handleChange = e => {
		const { value } = e.currentTarget;
		this.setState({ searchTerm: value, loading: true }, () =>
			this.performSearch(this.state.searchTerm)
		);
	};

	async performSearch(searchTerm) {
		const { data } = await http.get(`${config.apiEndpoint}${searchTerm}`);
		const fetchedShows = data.map(item => item.show);
		this.setState({ shows: fetchedShows, loading: false });
	}

	render() {
		const { searchTerm, loading, shows } = this.state;

		return (
			<main className="main-container" role="main">
				<h1 className="main-title">TV Watchlist</h1>
				<SearchForm searchTerm={searchTerm} handleChange={this.handleChange} />
				{searchTerm === "" ? (
					<NoShow />
				) : loading ? (
					<Loader />
				) : shows.length < 1 ? (
					<NoShow afterQuery />
				) : (
					<section className="shows">
						{shows.map(show => (
							<Card key={show.id} show={show} />
						))}
					</section>
				)}
			</main>
		);
	}
}

export default HomePage;

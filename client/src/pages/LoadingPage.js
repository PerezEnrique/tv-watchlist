import React from "react";
import { AuthContext } from "../contexts/authContext";
import Loader from "../components/Loader";

class LoadingPage extends React.Component {
	static contextType = AuthContext;

	componentDidUpdate() {
		if (!this.context.loadingUser) {
			const { state } = this.props.location;
			const redirectPath = state ? state.from.pathname : "/";
			this.props.history.push(redirectPath);
		}
	}

	render() {
		return (
			<main className="main-container" role="main">
				<h1>Loading. Please wait.</h1>
				<Loader />
			</main>
		);
	}
}

export default LoadingPage;

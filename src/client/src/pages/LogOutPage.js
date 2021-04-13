import React from "react";
import { AuthContext } from "../contexts/authContext";

class LogoutPage extends React.Component {
	static contextType = AuthContext;

	componentDidMount() {
		this.context.logOut();
		window.location = "/";
	}

	render() {
		return null;
	}
}

export default LogoutPage;

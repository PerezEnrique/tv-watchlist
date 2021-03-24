import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";

class App extends React.Component {
	render() {
		return (
			<div className="main-wrapper">
				<Switch>
					<Route path="/" exact component={HomePage} />
				</Switch>
			</div>
		);
	}
}

export default App;

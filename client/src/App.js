import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import LogOutPage from "./pages/LogOutPage";
import "./App.css";

class App extends React.Component {
	render() {
		return (
			<div className="main-wrapper">
				<Header />
				<Switch>
					<Route path="/log-in" component={LogInPage} />
					<Route path="/sign-up" component={SignUpPage} />
					<Route path="/log-out" component={LogOutPage} />
					<Route path="/" exact component={HomePage} />
				</Switch>
			</div>
		);
	}
}

export default App;

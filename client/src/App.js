import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthenticationRoute } from "./utils/RoutesHandlers";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import LogOutPage from "./pages/LogOutPage";
import LoadingPage from "./pages/LoadingPage";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";

class App extends React.Component {
	render() {
		return (
			<div className="main-wrapper">
				<Header />
				<Switch>
					<Route path="/loading-page" component={LoadingPage} />
					<AuthenticationRoute path="/sign-up" component={SignUpPage} />
					<Route path="/not-found" component={PageNotFound} />
					<AuthenticationRoute path="/log-in" component={LogInPage} />
					<Route path="/log-out" component={LogOutPage} />
					<Route path="/" exact component={HomePage} />
					<Redirect to="/not-found" />
				</Switch>
			</div>
		);
	}
}

export default App;

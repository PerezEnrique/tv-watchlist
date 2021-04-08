import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

export function AuthenticationRoute({ component: Component, ...rest }) {
	const { currentUser, loadingUser } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={props =>
				loadingUser ? (
					<Redirect to={{ pathname: "/loading-page", state: { from: props.location } }} />
				) : currentUser ? (
					<Redirect to="/" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
}

export function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser, loadingUser } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={props =>
				loadingUser ? (
					<Redirect to={{ pathname: "/loading-page", state: { from: props.location } }} />
				) : currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: "/log-in", state: { from: props.location } }} />
				)
			}
		/>
	);
}

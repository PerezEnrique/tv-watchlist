import React from "react";
import http from "../services/httpServices";

//CONTEXT
export const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

//AUTH PROVIDER
class AuthProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			loadingUser: true,
		};
	}

	async componentDidMount() {
		try {
			this.setState({ loadingUser: true });
			const { data } = await http.get("/user");
			this.setState({ currentUser: data.data });
			this.setState({ loadingUser: false });
		} catch (ex) {
			this.setState({ loadingUser: false });
			return null;
		}
	}

	signUp = async (email, password) => {
		//We are calling this method from outside so it has to be an arrow function so the "this" point to this class.
		const { data } = await http.post("/user/sign-up", { email, password });
		this.setState({ currentUser: data.data });
	};

	logIn = async (email, password) => {
		const { data } = await http.post("/user/log-in", { email, password });
		this.setState({ currentUser: data.data });
	};

	logOut = async () => {
		await http.delete("/user/log-out");
		this.setState({ currentUser: null });
	};

	updateWatchlist = async show => {
		const { data } = await http.put("/user/update-watchlist", { show });
		this.setState({ currentUser: data.data });
	};

	render() {
		const value = {
			currentUser: this.state.currentUser,
			loadingUser: this.state.loadingUser,
			signUp: this.signUp,
			logIn: this.logIn,
			logOut: this.logOut,
			updateWatchlist: this.updateWatchlist,
		};

		return (
			<AuthContext.Provider value={value}>{this.props.children}</AuthContext.Provider>
		);
	}
}

export default AuthProvider;

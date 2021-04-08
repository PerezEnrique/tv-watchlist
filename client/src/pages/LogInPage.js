import React from "react";
import Joi from "joi-browser";
import { AuthContext } from "../contexts/authContext";
import { validateUserData } from "../utils/validation";
import { objectIsEmpty } from "../utils/helpers";
import Loader from "../components/Loader";

class LogInPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {
				email: "",
				password: "",
			},
			errors: {},
			loading: false,
		};
	}

	static contextType = AuthContext;

	validationSchema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().min(5).label("Password"),
	});

	handleChange = e => {
		this.setState({ errors: {} });
		const { name, value } = e.currentTarget;
		const userData = { ...this.state.userData };
		userData[name] = value;
		this.setState({ userData });
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { userData } = this.state;
		const errors = validateUserData(userData, this.validationSchema);
		if (!objectIsEmpty(errors)) {
			this.setState({ errors });
		} else {
			try {
				this.setState({ loading: true });
				await this.context.logIn(userData.email, userData.password);
				this.props.history.push("/");
			} catch (ex) {
				if (ex.response && ex.response.status === 400) {
					const errors = {
						form: ex.response.data.errorMessage,
					};
					this.setState({ errors });
				}
				this.setState({ loading: false });
			}
		}
	};

	render() {
		const { userData, errors, loading } = this.state;

		return (
			<main className="main-container" role="main">
				<h1>Log in</h1>
				<form className="form" onSubmit={this.handleSubmit}>
					<div className="input-group">
						<label className="label" htmlFor="email">
							Email
						</label>
						<input
							className="input"
							type="email"
							id="email"
							name="email"
							value={userData.email}
							onChange={this.handleChange}
							placeholder="Enter email"
							required
						/>
						{errors.email && <div className="error-message">{errors.email}</div>}
					</div>
					<div className="input-group">
						<label className="label" htmlFor="password">
							Password
						</label>
						<input
							className="input"
							type="password"
							id="password"
							name="password"
							value={userData.password}
							onChange={this.handleChange}
							placeholder="Enter password"
							required
						/>
						{errors.password && <div className="error-message">{errors.password}</div>}
					</div>
					{errors.form && <div className="error-message">{errors.form}</div>}
					<button className="btn" type="submit" disabled={loading}>
						Log In
					</button>
					{loading && <Loader />}
				</form>
			</main>
		);
	}
}

export default LogInPage;

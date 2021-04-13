import { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";

function Header() {
	const [headerIsShown, setHeaderIsShown] = useState(false);
	const { currentUser } = useContext(AuthContext);

	return (
		<header className="header">
			<nav className={!headerIsShown ? "header__nav" : "header__nav header__nav--active"}>
				{!currentUser ? (
					<ul className="nav">
						<li onClick={() => setHeaderIsShown(!headerIsShown)}>
							<Link className="nav__link" to="/">
								Home
							</Link>
						</li>
						<li onClick={() => setHeaderIsShown(!headerIsShown)}>
							<Link className="nav__link" to="/log-in">
								Log In
							</Link>
						</li>
						<li onClick={() => setHeaderIsShown(!headerIsShown)}>
							<Link className="nav__link" to="/sign-up">
								Sign Up
							</Link>
						</li>
					</ul>
				) : (
					<ul className="nav">
						<li onClick={() => setHeaderIsShown(!headerIsShown)}>{currentUser.email}</li>
						<li onClick={() => setHeaderIsShown(!headerIsShown)}>
							<Link className="nav__link" to="/">
								Home
							</Link>
						</li>
						<li onClick={() => setHeaderIsShown(!headerIsShown)}>
							<Link className="nav__link" to="/user/watchlist">
								My Watchlist
							</Link>
						</li>
						<li onClick={() => setHeaderIsShown(!headerIsShown)}>
							<Link className="nav__link" to="/log-out">
								Log out
							</Link>
						</li>
					</ul>
				)}
			</nav>
			<div
				id="hamburguer"
				className="hamburguer"
				onClick={() => setHeaderIsShown(!headerIsShown)}
			>
				<div
					id="top-line"
					className={
						!headerIsShown
							? "hamburguer__line"
							: "hamburguer__line hamburguer__line--top-active"
					}
				></div>
				<div
					id="mid-line"
					className={
						!headerIsShown
							? "hamburguer__line"
							: "hamburguer__line hamburguer__line--mid-active"
					}
				></div>
				<div
					id="bottom-line"
					className={
						!headerIsShown
							? "hamburguer__line"
							: "hamburguer__line hamburguer__line--bottom-active"
					}
				></div>
			</div>
		</header>
	);
}

export default Header;

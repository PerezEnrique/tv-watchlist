import ReactDOM from "react-dom";
import AuthProvider from "./contexts/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
	<AuthProvider>
		<Router>
			<App />
		</Router>
	</AuthProvider>,
	document.getElementById("root")
);

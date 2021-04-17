require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

//configuration and middlewares
if (!process.env.SESS_SECRET) {
	console.log("FATAL ERROR: session private secret is not defined");
	process.exit(1);
}
const port = process.env.PORT || 8000;
const dbClient = connectDB().then(() => mongoose.connection.getClient());

app.use(express.json());
app.use(
	session({
		name: process.env.SESS_NAME,
		secret: process.env.SESS_SECRET,
		saveUninitialized: false,
		resave: false,
		store: MongoStore.create({
			clientPromise: dbClient,
			collection: "session",
			ttl: parseInt(process.env.SESS_LIFETIME) / 1000,
		}),
		cookie: {
			sameSite: true,
			secure: app.get("env") === "production",
			maxAge: parseInt(process.env.SESS_LIFETIME),
		},
	})
);

//routes
app.use("/api/user", userRoutes);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}
app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server runing in ${app.get("env")} mode on port ${port}`)
);

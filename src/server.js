require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const usersRoutes = require("./routes/usersRoutes");
const errorHandler = require("./middlewares/errorHandler");

//configuration and middlewares
if (!process.env.JWT_PRIVATE_KEY) {
	console.log("FATAL ERROR: JWT private key is not defined");
	process.exit(1);
}
connectDB();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//routes
app.use("/user", usersRoutes);
app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server runing in ${app.get("env")} mode on port ${port}`)
);

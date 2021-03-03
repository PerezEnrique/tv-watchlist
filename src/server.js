require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

//configuration and middlewares
connectDB();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.listen(port, () => console.log(`Server runing in ${app.get("env")} mode on port ${port}`));
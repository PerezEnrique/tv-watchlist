const mongoose = require("mongoose");
const { ShowSchema } = require("./Show");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		trim: true,
	},
	watchlist: {
		type: [ShowSchema],
	},
});

module.exports = mongoose.model("user", UserSchema);

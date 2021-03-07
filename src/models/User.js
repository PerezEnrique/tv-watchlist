const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

UserSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
};

module.exports = mongoose.model("user", UserSchema);

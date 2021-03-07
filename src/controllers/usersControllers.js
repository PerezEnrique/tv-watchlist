const bcrypt = require("bcrypt");
const User = require("../models/User");
const validateUserData = require("../utils/validateUserData");
const prepareDataForClient = require("../utils/prepareDataForClient");

async function getCurrentUser(req, res) {
	const user = await User.findById(req.user._id).select(["-_id", "-password"]); //I'm not returning the id in other routes so I want to be consistence
	return res.status(200).json({ data: user });
}

async function saveUser(req, res) {
	//We are using express-async-errrors
	const { email, password } = req.body;
	const { error } = validateUserData(req.body);
	if (error) return res.status(400).json({ success: false, errorMessage: error.message });

	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists)
		return res.status(400).json({
			success: false,
			errorMessage: "An user with the provided email already exists",
		});

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = new User({ email, password: hashedPassword });
	const token = newUser.generateAuthToken();
	const savedUser = await newUser.save();
	const dataForClient = prepareDataForClient(savedUser);
	return res
		.status(201)
		.header("x-auth-token", token)
		.header("access-control-expose-header", "x-auth-token")
		.json({ success: true, data: dataForClient });
}

async function authenticateUser(req, res) {
	const { email, password } = req.body;
	const { error } = validateUserData(req.body);
	if (error) return res.status(400).json({ success: false, errorMessage: error.message });

	const user = await User.findOne({ email });
	if (!user)
		return res
			.status(400)
			.json({ success: false, errorMessage: "Invalid email or password" });

	const passwordDidMatch = await bcrypt.compare(password, user.password);
	if (!passwordDidMatch)
		return res
			.status(400)
			.json({ success: false, errorMessage: "Invalid email or password" });

	const token = user.generateAuthToken();
	const dataForClient = prepareDataForClient(user);
	return res
		.status(200)
		.header("x-auth-token", token)
		.header("access-control-expose-header", "x-auth-token")
		.json({ success: true, data: dataForClient });
}

async function updateWatchlist(req, res) {
	const { id, name, image, rating, premiered, summary, genres } = req.body.show;

	const user = await User.findById(req.user._id);
	if (!user)
		return res
			.status(404)
			.json({ success: false, errorMessage: "Couldn't find user with the provided id" });

	const showAlreadyAdded = user.watchlist.find(show => show.id == id);
	if (showAlreadyAdded) {
		user.watchlist.id(showAlreadyAdded._id).remove();
		const updatedUser = await user.save();
		const dataForClient = prepareDataForClient(updatedUser);
		return res.status(200).json({ success: true, data: dataForClient });
	}

	const newShow = {
		id,
		name,
		image,
		rating,
		premiered,
		summary,
		genres,
	};

	user.watchlist.push(newShow);
	const updatedUser = await user.save();
	const dataForClient = prepareDataForClient(updatedUser);
	return res.status(200).json({ success: true, data: dataForClient });
}

module.exports = { saveUser, authenticateUser, getCurrentUser, updateWatchlist };

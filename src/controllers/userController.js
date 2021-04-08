const bcrypt = require("bcrypt");
const User = require("../models/User");
const { validateUserData } = require("../utils/validation");
const { sessionizeUser } = require("../utils/helpers");

//route: POST /user/sign-up
//access: public
//desc: saves user in db
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
	const savedUser = await newUser.save();
	const sessionUser = sessionizeUser(savedUser);
	req.session.user = sessionUser;
	return res.status(201).json({ success: true, data: sessionUser });
}

//route: POST /user/log-in
//access: public
//desc: logs user in
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

	const sessionUser = sessionizeUser(user);
	req.session.user = sessionUser;
	return res.status(200).json({ success: true, data: sessionUser });
}

//route: GET /user
//access: public
//desc: returns the current user
async function getCurrentUser(req, res) {
	return res.json({ success: true, data: req.session.user });
}

//route: DELETE /user/log-out
//access: public
//desc: logs user out
async function logUserOut(req, res) {
	req.session.destroy(err => {
		if (err) {
			throw err;
		}
	});

	res.clearCookie(process.env.SESS_NAME);
	return res.status(200).json({ success: true, data: `User successfully logout` });
}

//route: PUT /user/update-watchlist
//access: private
//desc: updates user's watchlist
async function updateWatchlist(req, res) {
	const { id, name, image, rating, premiered, summary, genres } = req.body.show;

	const user = await User.findById(req.session.user._id);
	if (!user)
		return res
			.status(404)
			.json({ success: false, errorMessage: "Couldn't find user with the provided id" });

	const showAlreadyAdded = user.watchlist.find(show => show.id == id);
	if (showAlreadyAdded) {
		user.watchlist.id(showAlreadyAdded._id).remove();
		const updatedUser = await user.save();
		const sessionUser = sessionizeUser(updatedUser);
		req.session.user = sessionUser;
		return res.status(200).json({ success: true, data: sessionUser });
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
	const sessionUser = sessionizeUser(updatedUser);
	req.session.user = sessionUser;
	return res.status(200).json({ success: true, data: sessionUser });
}

module.exports = {
	saveUser,
	authenticateUser,
	getCurrentUser,
	logUserOut,
	updateWatchlist,
};

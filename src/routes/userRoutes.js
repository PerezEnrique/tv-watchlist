const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const usersController = require("../controllers/userController");

const {
	saveUser,
	authenticateUser,
	getCurrentUser,
	logUserOut,
	updateWatchlist,
} = usersController;

router.get("/", getCurrentUser);
router.post("/sign-up", saveUser);
router.post("/log-in", authenticateUser);
router.put("/update-watchlist", auth, updateWatchlist);
router.delete("/log-out", logUserOut);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const usersController = require("../controllers/usersControllers");

const { saveUser, authenticateUser, getCurrentUser, updateWatchlist } = usersController;

router.get("/", auth, getCurrentUser);
router.post("/sign-up", saveUser);
router.post("/log-in", authenticateUser);
router.put("/update-watchlist", auth, updateWatchlist);

module.exports = router;

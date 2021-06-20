const express = require("express");
const router = express.Router();

const { getLeaderBoard, checkAndSetLeaderBoard } = require("../controllers/leaderBoard.controller");
const { authentication } = require("../middlewares/authentication.middleware");

router.route("/").get(getLeaderBoard).post(authentication, checkAndSetLeaderBoard);

module.exports = router;

const express = require("express");
const router = express.Router();

const { loadQuizBank, checkLevelAndGetQuizBank } = require("../controllers/quiz.controller");
const { authentication } = require("../middlewares/authentication.middleware");

router.route("/").post(authentication, checkLevelAndGetQuizBank);

router.route("/addquiz").post(loadQuizBank);

module.exports = router;

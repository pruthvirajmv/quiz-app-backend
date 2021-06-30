const express = require("express");
const router = express.Router();

const { addNewQuiz, checkLevelAndGetQuizBank } = require("../controllers/quiz.controller");
const { authentication } = require("../middlewares/authentication.middleware");

router.route("/").post(authentication, checkLevelAndGetQuizBank);

router.route("/addquiz").post(addNewQuiz);

module.exports = router;

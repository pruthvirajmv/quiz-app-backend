const express = require("express");
require("body-parser");

const errorHandler = require("./middlewares/error-handler.middleware");
const routeNotFound = require("./middlewares/route-not-found-handler.middleware");

const user = require("./routers/user.route");
const quiz = require("./routers/quiz.route");
const leaderBoard = require("./routers/leaderBoard.route");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const dbConnect = require("./db/db.connect");
dbConnect();

app.get("/", (req, res) => {
   res.json("Welcome to BaddyQuiz backend!");
});

app.use("/user", user);
app.use("/leaderboard", leaderBoard);

app.use("/quiz", quiz);

// must stay last
app.use(errorHandler);
app.use(routeNotFound);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log("Server Started");
});

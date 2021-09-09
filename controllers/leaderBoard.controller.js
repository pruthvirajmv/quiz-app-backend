const { LeaderBoard } = require("../models/leaderBoard.model");

const checkAndSetLeaderBoard = async (req, res) => {
   try {
      const { user } = req;
      const { attemptedLevel, newScore } = req.body;

      let selectLeaderBoard = await LeaderBoard.findOne({ level: attemptedLevel });

      if (!selectLeaderBoard) {
         return res.status(404).json({ message: "leader board not found" });
      }

      let currentStandings = selectLeaderBoard.standings;

      const newHighScorePlace = currentStandings.findIndex((standing) => newScore > standing.score);
      if (newHighScorePlace === -1) {
         if (currentStandings.length < 10) {
            currentStandings.push({ userName: user.userName, score: newScore });
            selectLeaderBoard.standings = currentStandings;
            await selectLeaderBoard.save();
            return res.status(200).json({ isNewHighScore: true, selectLeaderBoard });
         }
         return res.status(200).json({ isNewHighScore: false });
      }
      for (let i = currentStandings.length - 1; i > newHighScorePlace + 1; i++) {
         if (currentStandings[i]) {
            currentStandings[i] = currentStandings[i - 1];
         } else {
            currentStandings.push(currentStandings[currentStandings.length - 1]);
            break;
         }
      }

      const updatestandings = currentStandings.map((standing, index) =>
         index === newHighScorePlace ? { userName: user.userName, score: newScore } : standing
      );

      selectLeaderBoard.standings = updatestandings;
      await selectLeaderBoard.save();

      const leaderBoard = await LeaderBoard.find({});

      res.status(200).json({ isNewHighScore: true, leaderBoard });
   } catch (error) {}
};

const getLeaderBoard = async (req, res) => {
   try {
      const leaderBoard = await LeaderBoard.find({});
      leaderBoard._id = undefined;
      res.status(200).json({ message: "leader board found", leaderBoard });
   } catch (error) {
      res.status(500).json({ message: "leader board could not found" });
   }
};

module.exports = { getLeaderBoard, checkAndSetLeaderBoard };

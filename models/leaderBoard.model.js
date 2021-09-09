const mongoose = require("mongoose");

const LeaderBoardSchema = new mongoose.Schema({
   level: { type: String, required: "level is required", unique: true },
   standings: [
      {
         userName: {
            type: String,
            required: "user name is required",
         },
         score: { type: Number, required: "user score is required" },
      },
   ],
});

const LeaderBoard = mongoose.model("LeaderBoard", LeaderBoardSchema);

module.exports = {
   LeaderBoard,
};

const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
   level: { type: String, required: "level name is required", unique: true },
   questions: [
      {
         question: {
            type: String,
            required: "question is required",
            unique: true,
         },
         options: [
            {
               option: { type: mongoose.Mixed, required: "option is required", unique: true },
               isCorrect: {
                  type: Boolean,
                  required: "right/wrong option required",
               },
            },
         ],
         points: { type: Number, required: "Question reward is required" },
         negativePoints: { type: Number },
      },
   ],
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = {
   Quiz,
};

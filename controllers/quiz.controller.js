const { Quiz } = require("../models/quiz.model");

const addNewQuiz = async (req, res) => {
   try {
      const { loadQuiz } = req.body;

      const quizBank = new Quiz(loadQuiz);

      await quizBank.save();

      res.status(200).json({ message: "found quiz", quiz: quizBank });
   } catch (error) {
      res.status(500).json({ message: "could not retrive quiz" });
   }
};

const checkLevelAndGetQuizBank = async (req, res) => {
   try {
      const { selectedLevel } = req.body;
      const quizBank = await Quiz.findOne({ level: selectedLevel });

      if (!quizBank) {
         return res.status(400).json({ message: "quiz not found" });
      }
      quizBank.level = undefined;
      res.status(200).json({ message: "found quiz", quiz: quizBank });
   } catch (error) {
      res.status(500).json({ message: "could not retrive quiz" });
   }
};

module.exports = { addNewQuiz, checkLevelAndGetQuizBank };

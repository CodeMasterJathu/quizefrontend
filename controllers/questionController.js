const Question = require('../models/questionModel');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

exports.createQuestion = async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  try {
    const newQuestion = await Question.create({ question, options, correctAnswer });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error });
  }
};

exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, options, correctAnswer },
      { new: true, runValidators: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error updating question', error });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error });
  }
};
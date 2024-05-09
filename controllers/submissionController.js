const Submission = require('../models/submissionModel');
const Question = require('../models/questionModel');

exports.submitAnswers = async (req, res) => {
  const { studentId, answers } = req.body;

  try {
    let submission = await Submission.findOne({ studentId });
    if (submission) {
      submission.answers = answers;
      await submission.save();
    } else {
      submission = await Submission.create({ studentId, answers });
    }

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answers', error });
  }
};

exports.getResults = async (req, res) => {
  const { studentId } = req.query;

  try {
    // Find the student's submission
    const submission = await Submission.findOne({ studentId });
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Calculate the score
    const questions = await Question.find();
    const score = questions.reduce((total, question, index) => {
      if (question.correctAnswer === submission.answers[index]) {
        return total + 1;
      }
      return total;
    }, 0);

    res.json({ score, totalQuestions: questions.length });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error });
  }
};
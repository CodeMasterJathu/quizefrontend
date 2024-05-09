const AskedQuestion = require('../models/askedQuestionModel');

exports.askQuestion = async (req, res) => {
  const { question } = req.body;
  const askedBy = req.user._id;

  try {
    const newQuestion = await AskedQuestion.create({ question, askedBy });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error asking question', error });
  }
};

exports.getAskedQuestions = async (req, res) => {
  try {
    const askedQuestions = await AskedQuestion.find()
      .populate('askedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(askedQuestions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching asked questions', error });
  }
};

exports.deleteAskedQuestion = async(req,res)=>{
  const questionId = req.params.questionId;

  try {
    const askedQuestion = await AskedQuestion.findByIdAndDelete(questionId);

    if (!askedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting asked question', error });
  }

}
exports.submitAnswer = async (req, res) => {
  const { questionId } = req.params;
  const { answer } = req.body;

  try {
    const askedQuestion = await AskedQuestion.findById(questionId);

    if (!askedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    askedQuestion.answer = answer;
    await askedQuestion.save();

    res.status(200).json({ message: 'Answer submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answer', error });
  }
};
const express = require('express');
const router = express.Router();
const { askQuestion, getAskedQuestions, submitAnswer, deleteAskedQuestion } = require('../controllers/askedQuestionController');
const { protect, authorize } = require('../middleware/authMiddleware');


router.post('/', protect, authorize('student'), askQuestion);
router.get('/', protect, authorize('teacher', 'student','admin'), getAskedQuestions);
router.delete('/:questionId', protect, authorize('teacher', 'student','admin'), deleteAskedQuestion);
router.post('/:questionId/answer', protect, authorize('teacher'), submitAnswer);

module.exports = router;

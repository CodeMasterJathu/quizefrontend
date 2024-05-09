const express = require('express');
const router = express.Router();
const { getQuestions, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionController');
const { protect, authorize } = require('../middleware/authMiddleware');


router.get('/', protect, getQuestions);
router.post('/', protect, authorize('admin', 'teacher'), createQuestion);
router.put('/:id', protect, authorize('admin', 'teacher'), updateQuestion);
router.delete('/:id', protect, authorize('admin', 'teacher'), deleteQuestion);

module.exports = router;
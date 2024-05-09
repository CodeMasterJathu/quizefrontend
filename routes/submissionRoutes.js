const express = require('express');
const router = express.Router();
const { submitAnswers, getResults } = require('../controllers/submissionController');
const { protect,authorize } = require('../middleware/authMiddleware');


router.post('/', protect, submitAnswers);
router.get('/results', protect, getResults);

module.exports = router;
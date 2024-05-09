const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, authorize('admin'), getUsers);
router.post('/', protect, authorize('admin'), createUser);
router.put('/:id', protect, authorize('admin'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
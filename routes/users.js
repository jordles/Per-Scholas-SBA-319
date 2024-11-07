import express from 'express';
import User from '../controllers/users.js';
import hashPassword from '../middleware/hashPassword.js';
const router = express.Router();

// GET Users
router.get('/', User.getUsers);
router.get('/:id', User.getUserById);
router.get('/id/:userId', User.getUserByUserId);
router.get('/search', User.getUserBySearch);

router.post('/', hashPassword, User.createUserAndLogin);

export default router
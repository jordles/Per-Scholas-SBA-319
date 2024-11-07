import express from 'express';
import User from '../controllers/users.js';

const router = express.Router();

// GET Users
router.get('/', User.getUsers);
router.get('/:id', User.getUserById);
router.get('/id/:userId', User.getUserByUserId);
router.get('/search', User.getUserBySearch);


export default router
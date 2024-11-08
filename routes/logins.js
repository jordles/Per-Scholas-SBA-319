import express from 'express';
import Login from '../controllers/logins.js';
import hashPassword from '../middleware/hashPassword.js';
const router = express.Router();

router.get('/', Login.getLogins);
router.get('/:id', Login.getLoginById);
router.get('/id/:loginId', Login.getLoginByLoginId);
router.get('/:id/user', Login.getUserByLogin);

router.patch('/:id', Login.updateLogin)

router.delete('/:id', Login.deleteLogin)

export default router
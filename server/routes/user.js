import express from 'express';

const router = express.Router();

import { register, login, logOut, getAllUsers } from '../controllers/user.js';
import auth from '../middleware/auth.js';

router.get('/getall', auth, getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/logout',auth, logOut);


export default router;
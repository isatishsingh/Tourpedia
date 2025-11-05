import express from 'express';

const router = express.Router();

import { register, login, logOut } from '../controllers/user.js';
import auth from '../middleware/auth.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout',auth, logOut);

export default router;
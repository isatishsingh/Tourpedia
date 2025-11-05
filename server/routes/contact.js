import express from 'express';
import { create, getAll } from '../controllers/contact.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// agar aisa flow rakhna hua jisme user bina login k bhi contact form bhar sake tab auth ko comment kar dena


router.post('/create', auth, create);
router.get('/getall', auth, getAll);

export default router;
import express from 'express';
import { create, getAll } from '../controllers/contact.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, create);
router.get('/getall', auth, getAll);

export default router;
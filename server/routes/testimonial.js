import express from "express";
import { createTestimonial, getAllTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } from '../controllers/testimonial.js';
import auth from '../middleware/auth.js';
const router = express.Router();


router.post('/create', auth, createTestimonial);
router.get('/getall', auth, getAllTestimonials);
router.get('/get/:id', auth, getTestimonialById);
router.put('/update/:id', auth, updateTestimonial);
router.delete('/delete/:id', auth, deleteTestimonial);

export default router;
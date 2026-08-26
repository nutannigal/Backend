import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile, getDashboardStats } from '../controllers/adminController.js';
import { sendEmailToClient } from '../controllers/emailController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected Routes (Sirf Admin hi use kar sakta hai)
router.get('/profile', protect, getAdminProfile);
router.get('/stats', protect, getDashboardStats);
router.post('/send-email', protect, sendEmailToClient);

export default router;
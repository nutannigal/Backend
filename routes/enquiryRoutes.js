import express from 'express';
import {
  addEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
} from '../controllers/enquiryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public (Customer)
router.post('/add', addEnquiry);

// Protected (Admin)
router.get('/all', protect, getAllEnquiries);
router.get('/:id', protect, getEnquiryById);
router.put('/:id', protect, updateEnquiryStatus);

export default router;
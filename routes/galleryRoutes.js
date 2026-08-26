import express from 'express';
import {
  addGalleryItem,
  getAllGallery,
  getGalleryByCategory,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllGallery);
router.get('/category/:category', getGalleryByCategory);

// Protected Routes (Admin)
router.post('/', protect, upload.single('image'), addGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

export default router;
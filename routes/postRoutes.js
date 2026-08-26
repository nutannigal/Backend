import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostBySlug,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public
router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);

// Protected
router.post('/', protect, upload.single('image'), createPost);
router.put('/:id', protect, upload.single('image'), updatePost);
router.delete('/:id', protect, deletePost);

export default router; // <-- MUST BE DEFAULT
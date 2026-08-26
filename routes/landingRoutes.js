import express from 'express';
import { getLandingContent, updateLandingContent } from '../controllers/landingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/content', getLandingContent);
router.put('/content', protect, updateLandingContent);

export default router;
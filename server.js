import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';

import adminRoutes from './routes/adminRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import landingRoutes from './routes/landingRoutes.js';
import postRoutes from './routes/postRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

const app = express();

const seedDefaultAdmin = async () => {
  try {
    const email = 'admin@tupebrothers.in';
    const password = 'admin123';

    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      await Admin.create({
        name: 'Super Admin',
        email,
        password,
      });
      console.log('Default admin created: admin@tupebrothers.in / admin123');
    }
  } catch (error) {
    console.error('Admin seed error:', error.message);
  }
};

const startServer = async () => {
  await connectDB();
  await seedDefaultAdmin();

  app.use(cors());
  app.use(express.json());

  app.use('/api/admin', adminRoutes);
  app.use('/api/enquiry', enquiryRoutes);
  app.use('/api/landing', landingRoutes);
  app.use('/api/gallery', galleryRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/portfolio', portfolioRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
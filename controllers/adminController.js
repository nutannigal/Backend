import Admin from '../models/Admin.js';
import Enquiry from '../models/Enquiry.js';
import Post from '../models/Post.js';
import Gallery from '../models/Gallery.js';
import LandingContent from '../models/LandingContent.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// @desc    Admin Register (Sirf pehli baar use karna, baad mein delete kar dena)
// @route   POST /api/admin/register
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const admin = await Admin.create({ name, email, password });
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin Login
// @route   POST /api/admin/login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Admin Profile (Protected)
// @route   GET /api/admin/profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [totalEnquiries, totalPosts, totalGallery, landingContent] = await Promise.all([
      Enquiry.countDocuments(),
      Post.countDocuments(),
      Gallery.countDocuments(),
      LandingContent.findOne(),
    ]);

    const portfolioItems = landingContent?.portfolio?.length || 0;

    res.status(200).json({
      success: true,
      data: {
        totalEnquiries,
        portfolioItems,
        unreadMessages: totalEnquiries,
        totalPosts,
        totalGallery,
        settings: 1,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminController = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getDashboardStats,
};

export default adminController;
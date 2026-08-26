import Gallery from '../models/Gallery.js';

// @desc    Gallery image add karein (Admin)
// @route   POST /api/gallery
export const addGalleryItem = async (req, res) => {
  try {
    const { title, category, imageUrl } = req.body;
    const item = await Gallery.create({ title, category, imageUrl });
    res.status(201).json({ success: true, message: 'Image added', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Saari images get karein (Public)
// @route   GET /api/gallery
export const getAllGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Category wise filter (Public)
// @route   GET /api/gallery/category/:category
export const getGalleryByCategory = async (req, res) => {
  try {
    const items = await Gallery.find({ category: req.params.category });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Image delete (Admin)
// @route   DELETE /api/gallery/:id
export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Image not found' });
    res.status(200).json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
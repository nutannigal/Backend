import Portfolio from '../models/Portfolio.js';

export const getAllPortfolio = async (req, res) => {
  try {
    const projects = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPortfolio = async (req, res) => {
  try {
    const { title, category, image, description } = req.body;

    if (!title || !category || !image) {
      return res.status(400).json({ success: false, message: 'Title, category and image are required' });
    }

    const project = await Portfolio.create({ title, category, image, description });
    res.status(201).json({ success: true, message: 'Portfolio item created', data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }

    res.status(200).json({ success: true, message: 'Portfolio item updated', data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }

    res.status(200).json({ success: true, message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import Enquiry from '../models/Enquiry.js';

// @desc    Customer se enquiry submit
// @route   POST /api/enquiry/add
export const addEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    const enquiry = await Enquiry.create({ name, email, phone, message });
    res.status(201).json({ success: true, message: 'Enquiry submitted!', data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin saari enquiries dekh sakta hai (Protected)
// @route   GET /api/enquiry/all
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Ek specific enquiry ki detail
// @route   GET /api/enquiry/:id
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Status update (Admin)
// @route   PUT /api/enquiry/:id
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!enquiry) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: 'Status updated', data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const enquiryController = {
  addEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
};

export default enquiryController;
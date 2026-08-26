import nodemailer from 'nodemailer';
import Enquiry from '../models/Enquiry.js';

// @desc    Client ko email bhejna (Admin)
// @route   POST /api/admin/send-email
export const sendEmailToClient = async (req, res) => {
  try {
    const { enquiryId, subject, message } = req.body;

    // Pehle enquiry find karo
    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    // Nodemailer Transporter Setup (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: enquiry.email,
      subject: subject || 'Response to your Interior Design Enquiry',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #C6A15B;">Interior.Studio</h2>
          <p>Dear <strong>${enquiry.name}</strong>,</p>
          <p>${message}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #888; font-size: 14px;">This is a response to your enquiry regarding: <br/> <em>"${enquiry.message}"</em></p>
          <p style="color: #888; font-size: 14px;">Feel free to reply to this email or call us at +91 98765 43210.</p>
          <p style="color: #C6A15B; font-weight: bold;">Team Interior.Studio</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Email bhejne ke baad status update karo
    enquiry.status = 'Contacted';
    await enquiry.save();

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
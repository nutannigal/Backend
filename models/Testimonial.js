import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: { type: String },
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
export default Testimonial;
import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
}, { timestamps: true });

const Feature = mongoose.model('Feature', FeatureSchema);
export default Feature;
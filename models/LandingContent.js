import mongoose from 'mongoose';

const LandingContentSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: '#1 Interior Design Studio in India' },
    title: { type: String, default: 'Design Your Dream Space' },
    subtitle: { type: String, default: 'We craft modern, elegant interiors that reflect your personality.' },
    backgroundImage: { type: String, default: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    buttonText: { type: String, default: 'Get Free Quote' },
    trustBadges: [{
      icon: { type: String, enum: ['check', 'star'], default: 'check' },
      text: { type: String, default: 'Trusted by 500+ clients' },
    }],
  },
  stats: [{
    number: { type: String, required: true },
    label: { type: String, required: true },
  }],
  features: [{
    icon: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
  }],
  portfolio: [{
    title: { type: String, default: 'Luxury Living Room' },
    category: { type: String, default: 'Residential' },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  }],
  testimonials: [{
    name: { type: String, default: 'Priya Sharma' },
    location: { type: String, default: 'Mumbai' },
    text: { type: String, default: 'Absolutely stunning work! They transformed our entire home into a modern masterpiece.' },
    rating: { type: Number, default: 5 },
    image: { type: String, default: 'https://randomuser.me/api/portraits/women/44.jpg' },
  }],
  footer: {
    companyName: { type: String, default: 'Tupe Brothers' },
    tagline: { type: String, default: 'Crafting beautiful, functional spaces that inspire and delight.' },
    quickLinks: [{ type: String }],
    contact: {
      phone: { type: String, default: '+91 98765 43210' },
      whatsapp: { type: String, default: '+91 70202 58612' },
      email: { type: String, default: 'info@tupebrothers.in' },
      address: { type: String, default: 'Mumbai, India' },
    },
    hours: [{ type: String }],
    copyright: { type: String, default: '© 2026 Tupe Brothers. All rights reserved.' },
  },
}, { timestamps: true });

const LandingContent = mongoose.model('LandingContent', LandingContentSchema);
export default LandingContent;
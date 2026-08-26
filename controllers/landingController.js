import LandingContent from '../models/LandingContent.js';
import {
  createWhatsappChatUrl,
  DEFAULT_WHATSAPP_NUMBER,
} from '../services/whatsappService.js';

export const getLandingContent = async (req, res) => {
  try {
    let content = await LandingContent.findOne();
    if (!content) {
      const defaultData = {
        hero: {
          badge: '#1 Interior Design Studio in India',
          title: 'Design Your Dream Space',
          subtitle: 'We craft modern, elegant interiors that reflect your personality. From concept to completion, we bring your vision to life.',
          backgroundImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
          buttonText: 'Get Free Quote',
          trustBadges: [
            { icon: 'check', text: 'Trusted by 500+ clients' },
            { icon: 'star', text: '4.9 / 5.0 Rating' },
          ],
        },
        stats: [
          { number: '500+', label: 'Projects Completed' },
          { number: '98%', label: 'Client Satisfaction' },
          { number: '15+', label: 'Design Awards' },
          { number: '50+', label: 'Expert Designers' },
        ],
        features: [
          { icon: 'palette', title: 'Custom Designs', desc: 'Tailored interiors that reflect your unique style and personality.' },
          { icon: 'ruler', title: 'Space Optimization', desc: 'Smart layouts that maximize every square foot of your space.' },
          { icon: 'shield', title: 'Quality Assurance', desc: 'Premium materials and meticulous craftsmanship guaranteed.' },
          { icon: 'clock', title: 'On-Time Delivery', desc: 'We respect your time and deliver projects as promised.' },
        ],
        portfolio: [
          { title: 'Luxury Living Room', category: 'Residential', image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Modern Office Space', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Elegant Bedroom', category: 'Residential', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Minimalist Kitchen', category: 'Residential', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Spa-Inspired Bathroom', category: 'Residential', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Corporate Boardroom', category: 'Commercial', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Penthouse Terrace', category: 'Outdoor', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Boutique Retail Store', category: 'Commercial', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Kids Playroom', category: 'Residential', image: 'https://images.unsplash.com/photo-1585314062604-1a3579e9c9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Home Theatre', category: 'Residential', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Restaurant Interior', category: 'Commercial', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { title: 'Study & Library', category: 'Residential', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        ],
        testimonials: [
          { name: 'Priya Sharma', location: 'Mumbai', text: 'Absolutely stunning work! They transformed our entire home into a modern masterpiece. Every detail was perfect.', rating: 5, image: 'https://randomuser.me/api/portraits/women/44.jpg' },
          { name: 'Rahul Verma', location: 'Delhi', text: 'The team understood our vision perfectly and delivered beyond expectations. Our office space now feels incredibly inspiring.', rating: 5, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { name: 'Ananya Reddy', location: 'Bangalore', text: 'From consultation to completion, the experience was seamless. Our living room looks like it belongs in a design magazine!', rating: 5, image: 'https://randomuser.me/api/portraits/women/68.jpg' },
        ],
        footer: {
          companyName: 'Tupe Brothers',
          tagline: 'Crafting beautiful, functional spaces that inspire and delight.',
          quickLinks: ['Home', 'Portfolio', 'Services', 'Contact'],
          contact: {
            phone: '+91 98765 43210',
            whatsapp: DEFAULT_WHATSAPP_NUMBER,
            email: 'info@tupebrothers.in',
            address: 'Mumbai, India',
          },
          hours: ['Mon - Fri: 9:00 AM - 8:00 PM', 'Saturday: 10:00 AM - 6:00 PM', 'Sunday: Closed'],
          copyright: '© 2026 Tupe Brothers. All rights reserved.',
        },
      };
      content = await LandingContent.create(defaultData);
    }
    const responseData = content.toObject();
    const whatsappNumber = responseData.footer?.contact?.whatsapp || DEFAULT_WHATSAPP_NUMBER;
    responseData.footer = {
      ...responseData.footer,
      contact: {
        ...responseData.footer?.contact,
        whatsappChatUrl: createWhatsappChatUrl({ phoneNumber: whatsappNumber }),
      },
    };

    res.json({ success: true, data: responseData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLandingContent = async (req, res) => {
  try {
    let content = await LandingContent.findOne();
    if (!content) {
      content = new LandingContent(req.body);
    } else {
      Object.assign(content, req.body);
    }
    await content.save();
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
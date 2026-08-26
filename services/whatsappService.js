const DEFAULT_WHATSAPP_NUMBER = '+91 70202 58612';

const DEFAULT_WHATSAPP_MESSAGE = [
  'Hello Tupe Brothers And Associates,',
  '',
  'I would like to discuss my interior design plan.',
  '',
  'Name: [Your Full Name]',
  'Phone: [Your Phone Number]',
  'Email: [Your Email Address]',
  'Project Type: [Residential/Commercial/Renovation]',
  'Area: [Sq. Ft.]',
  'Budget Range: [5L - 10L]',
  'Timeline: [Immediate / 1-3 months]',
  'Message: [Your specific requirements]',
  '',
  'Thank you.',
].join('\n');

export const normalizeWhatsappNumber = (phoneNumber = DEFAULT_WHATSAPP_NUMBER) =>
  String(phoneNumber).replace(/\D/g, '');

export const createWhatsappChatUrl = ({ phoneNumber, message = DEFAULT_WHATSAPP_MESSAGE } = {}) => {
  const normalizedNumber = normalizeWhatsappNumber(phoneNumber);
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
};

export { DEFAULT_WHATSAPP_MESSAGE, DEFAULT_WHATSAPP_NUMBER };

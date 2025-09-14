import { CartItem } from '../store/CartContext';

interface WhatsAppMessageOptions {
  items: CartItem[];
  notes?: string;
}

export const useWhatsAppMessage = () => {
  const formatWhatsAppMessage = ({ items, notes = '' }: WhatsAppMessageOptions): string => {
    let message = 'Hello Geneve, I\'d like a quote:\n\n';
    
    // Add products
    items.forEach(item => {
      message += `- ${item.name} (SKU: ${item.sku}) - Qty: ${item.quantity}\n`;
    });
    
    // Add notes if provided
    if (notes.trim()) {
      message += `\nNotes: ${notes.trim()}\n`;
    }
    
    message += '\nThank you!';
    
    return encodeURIComponent(message);
  };

  const openWhatsApp = (encodedText: string) => {
    const phone = import.meta.env.VITE_WHATSAPP_PHONE || '5491112345678';
    const url = `https://wa.me/${phone}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const sendQuote = (options: WhatsAppMessageOptions) => {
    const encodedMessage = formatWhatsAppMessage(options);
    openWhatsApp(encodedMessage);
  };

  return {
    formatWhatsAppMessage,
    openWhatsApp,
    sendQuote,
  };
};
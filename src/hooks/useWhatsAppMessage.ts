import { CartItem } from '../store/CartContext';

interface WhatsAppMessageOptions {
  items: CartItem[];
  notes?: string;
}

/* === GTM helper local (no requiere crear otros archivos) === */
declare global {
  interface Window { dataLayer: any[] }
}
const track = (event: string, params: Record<string, any> = {}) => {
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({ event, ...params });
};

export const useWhatsAppMessage = () => {
  const formatWhatsAppMessage = ({ items, notes = '' }: WhatsAppMessageOptions): string => {
    let message = 'Hola Geneve, me gustaría recibir un presupuesto:\n\n';
    
    // Add products
    items.forEach(item => {
      message += `- ${item.name} (SKU: ${item.sku}) - Cantidad: ${item.quantity}\n`;
    });
    
    // Add notes if provided
    if (notes.trim()) {
      message += `\nNotes: ${notes.trim()}\n`;
    }
    
    message += '\nMuchas Gracias!';
    
    return encodeURIComponent(message);
  };

  const openWhatsApp = (encodedText: string) => {
    const phone = import.meta.env.VITE_WHATSAPP_PHONE || '5491159278803';
    const url = `https://wa.me/${phone}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const sendQuote = (options: WhatsAppMessageOptions) => {
    // ---- GTM: medición del click en WhatsApp ----
    try {
      const { items, notes } = options;
      track('whatsapp_click', {
        source: 'quote',                           // origen del CTA
        path: typeof window !== 'undefined' ? window.location.pathname : '',
        item_count: items.length,                  // cantidad de items
        skus: items.map(i => i.sku).filter(Boolean).join(','), // SKUs (string corto)
        has_notes: Boolean(notes && notes.trim()), // si agregó notas
      });
    } catch (_) {
      // silencioso: nunca rompemos el envío si falla la métrica
    }
    // ---------------------------------------------

    const encodedMessage = formatWhatsAppMessage(options);
    openWhatsApp(encodedMessage);
  };

  return {
    formatWhatsAppMessage,
    openWhatsApp,
    sendQuote,
  };
};

import { CartItem } from '../store/CartContext';

export interface WhatsAppMessageOptions {
  items: CartItem[];
  notes?: string;
}

/* === GTM helper local (no requiere crear otros archivos) === */
declare global {
  interface Window { dataLayer: any[] }
}
const track = (event: string, params: Record<string, any> = {}) => {
  try {
    if (typeof window === 'undefined') return;
    if (!window.dataLayer) window.dataLayer = [];
    window.dataLayer.push({ event, ...params });
  } catch {
    /* nunca romper por métricas */
  }
};

const DEFAULT_PHONE = '5491159278803';
const MAX_TEXT_LEN = 3500; // margen para el límite de WhatsApp (~4096)

const sanitizePhone = (raw: string) => raw.replace(/[^\d]/g, '');

/** Corta el texto si se excede y agrega indicador de truncado */
const clampText = (txt: string, max = MAX_TEXT_LEN) =>
  txt.length > max ? `${txt.slice(0, max - 10)}\n…(mensaje truncado)` : txt;

export const useWhatsAppMessage = () => {
  const formatWhatsAppMessage = ({ items, notes = '' }: WhatsAppMessageOptions): string => {
    let message = 'Hola Geneve, me gustaría recibir un presupuesto:\n\n';

    items.forEach((item) => {
      message += `- ${item.name} (SKU: ${item.sku ?? '-'}) - Cantidad: ${item.quantity}\n`;
    });

    if (notes.trim()) {
      message += `\nNotas: ${notes.trim()}\n`;
    }

    message += '\n¡Muchas gracias!';

    return encodeURIComponent(clampText(message));
  };

  const openWhatsApp = (encodedText: string) => {
    const envPhone = (import.meta as any)?.env?.VITE_WHATSAPP_PHONE || DEFAULT_PHONE;
    const phone = sanitizePhone(envPhone);
    const url = `https://wa.me/${phone}?text=${encodedText}`;

    // puede bloquear el popup: no lanzamos error
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // fallback: abrir en la misma pestaña si el navegador lo permite
      window.location.href = url;
    }
  };

  const sendQuote = (options: WhatsAppMessageOptions) => {
    // ---- GTM: medición del click en WhatsApp (consistente con el resto del sitio) ----
    const { items, notes } = options;
    track('click_whatsapp', {
      source: 'quote',
      path: typeof window !== 'undefined' ? window.location.pathname : '',
      item_count: items.length,
      skus: items.map((i) => i.sku).filter(Boolean).join(','), // string corto
      has_notes: Boolean(notes && notes.trim()),
    });
    // -----------------------------------------------------------------------------------

    const encodedMessage = formatWhatsAppMessage(options);
    openWhatsApp(encodedMessage);
  };

  return {
    formatWhatsAppMessage,
    openWhatsApp,
    sendQuote,
  };
};

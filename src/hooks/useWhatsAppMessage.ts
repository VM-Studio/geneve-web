import { CartItem } from '../store/CartContext';

export interface WhatsAppMessageOptions {
  items: CartItem[];
  notes?: string;
}

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
const MAX_TEXT_LEN = 3500;

const sanitizePhone = (raw: string) => raw.replace(/[^\d]/g, '');
const clampText = (txt: string, max = MAX_TEXT_LEN) =>
  txt.length > max ? `${txt.slice(0, max - 20)}\n…(mensaje truncado)` : txt;

export const useWhatsAppMessage = () => {
  /** 🧾 Arma el texto del mensaje con formato legible */
  const formatWhatsAppMessage = ({ items, notes = '' }: WhatsAppMessageOptions): string => {
    let msg = `👷‍♂️ *Solicitud de Presupuesto - Geneve*\n\n`;
    msg += `Estos son los productos que me gustaría cotizar:\n\n`;

    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name}`;
      if (item.sku) msg += ` (SKU: ${item.sku})`;
      msg += ` — Cantidad: ${item.quantity}\n`;
    });

    if (notes.trim()) {
      msg += `\n📋 *Notas del cliente:*\n${notes.trim()}\n`;
    }

    msg += `\nGracias, aguardo su respuesta.`;
    return encodeURIComponent(clampText(msg));
  };

  /** 🚀 Abre WhatsApp correctamente en nueva pestaña */
  const openWhatsApp = (encodedText: string) => {
    const envPhone = (import.meta as any)?.env?.VITE_WHATSAPP_PHONE || DEFAULT_PHONE;
    const phone = sanitizePhone(envPhone);
    const url = `https://wa.me/${phone}?text=${encodedText}`;

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = url;
    }
  };

  /** 🧩 Lógica principal de envío del presupuesto */
  const sendQuote = (options: WhatsAppMessageOptions) => {
    const { items, notes } = options;

    track('click_whatsapp_quote', {
      source: 'quote',
      item_count: items.length,
      has_notes: Boolean(notes && notes.trim()),
      skus: items.map((i) => i.sku).join(','),
    });

    const encodedMessage = formatWhatsAppMessage(options);
    openWhatsApp(encodedMessage);
  };

  return { formatWhatsAppMessage, openWhatsApp, sendQuote };
};

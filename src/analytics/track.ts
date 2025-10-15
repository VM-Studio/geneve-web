// src/analytics/track.ts

// Tipados globales para evitar errores en TS
declare global {
    interface Window {
      dataLayer: any[];
      gtag: (...args: any[]) => void;
    }
  }
  
  /**
   * Wrapper para enviar eventos a Google Tag Manager (dataLayer).
   * No rompe si dataLayer aún no existe.
   */
  export const track = (event: string, params: Record<string, any> = {}) => {
    if (!window.dataLayer) window.dataLayer = [];
    window.dataLayer.push({ event, ...params });
  };
  
  /**
   * Dispara una conversión de Google Ads usando gtag (ya cargado en index.html).
   * - sendTo: "AW-XXXXXXXXXX/CONVERSION_LABEL"
   * - params opcionales: { value: number, currency: 'ARS' | 'USD' | ... }
   */
  export const sendAdsConversion = (
    sendTo: string,
    params: Record<string, any> = {}
  ) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: sendTo, ...params });
    }
  };
  
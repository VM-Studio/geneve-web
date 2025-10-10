// src/analytics/track.ts
declare global {
    interface Window { dataLayer: any[] }
  }
  
  /**
   * Pequeño wrapper para enviar eventos a Google Tag Manager.
   * No rompe si dataLayer aún no existe.
   */
  export const track = (event: string, params: Record<string, any> = {}) => {
    if (!window.dataLayer) window.dataLayer = [];
    window.dataLayer.push({ event, ...params });
  };
  
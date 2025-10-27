// src/pages/Works.tsx
import React from 'react';
import { ShoppingCart, MessageCircle, Download } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ProductCarousel } from '../components/product/ProductCarousel';

export const Works: React.FC = () => {
  // WhatsApp fijo pedido: 1159278803 -> en wa.me debe ir 5491159278803
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '5491159278803';

  const openWhatsApp = (text: string) => {
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const carouselItems = [
    { id: '1', name: 'DISYUNTORES', to: '/product/disyuntor-diferencial-25a-30ma', imageUrl: 'https://i.postimg.cc/k48CjWvx/Screenshot-2025-09-25-at-8-29-38-AM.png' },
    { id: '2', name: 'LUCES DE EMERGENCIA', to: '/product/cartel-luminoso-salida-emergencia', imageUrl: 'https://i.postimg.cc/V6tHt8jR/Screenshot-2025-09-25-at-9-36-53-AM.png' },
    { id: '3', name: 'CAÑOS CORRUGADOS', to: '/product/canos-corrugados', imageUrl: 'https://i.postimg.cc/zGtm6kNb/Screenshot-2025-10-03-at-7-37-30-AM.png' },
    { id: '4', name: 'CAJAS TÉRMICAS', to: '/product/caja-para-termica', imageUrl: 'https://i.postimg.cc/dt8trw5b/Screenshot-2025-09-21-at-4-13-10-PM.png' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16">
        {/* Carrusel */}
        <section className="mb-12 -mt-4">
          <ProductCarousel items={carouselItems} />
        </section>

        {/* CTA */}
        <div className="text-center bg-[#e04f01]/10 rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Listo para cotizar tu proyecto?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Contanos qué necesitás y te asesoramos sin costo para armar tu pedido con precios y disponibilidad actualizados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center font-heading">
            <Button
              as={Link}
              to="/catalog"
              size="lg"
              className="inline-flex items-center space-x-2 bg-[#e04f01] text-white hover:bg-[#e04f01]/90"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Ver Productos</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => openWhatsApp('Hola Geneve, quiero cotizar un proyecto de obras.')}
              className="inline-flex items-center space-x-2 border-2 border-[#e04f01] text-gray-900 hover:bg-[#e04f01]/10"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contactar por WhatsApp</span>
            </Button>
          </div>
        </div>

        {/* Intro */}
        <div className="text-center mb-10 mt-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Presupuesto para Obras</h1>
          <p className="text-xl text-gray-600 max-w-1xl mx-auto leading-relaxed">
            Nuestro equipo puede ayudarte a elegir los productos adecuados para tu proyecto de construcción y armar un presupuesto personalizado.
          </p>
        </div>

        {/* Descarga catálogo + sidebar */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* IZQUIERDA: tarjeta de descarga */}
          <section className="lg:col-span-3 space-y-4">
            {/* Aviso “Venta por mayor para obras” */}
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-[#e04f01]/20 p-4">
              <p className="text-sm font-medium text-gray-900">Venta por mayor para obras</p>
              <p className="text-sm text-gray-600">Descargá el catálogo y solicitá tu cotización por ítems y metrado.</p>
            </div>

            {/* Tarjeta de descarga estilo ejemplo */}
            <div className="rounded-2xl bg-white shadow-xl ring-2 ring-[#e04f01] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 grid place-items-center rounded-xl bg-white shadow-md ring-1 ring-[#e04f01]/30">
                    <span className="absolute -top-2 -left-2 text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 shadow">
                      PDF
                    </span>
                    <div className="h-6 w-6 text-[#e04f01]">
                      <Download className="w-6 h-6" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Catálogo Completo</h3>
                      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5">
                        ● Vigente
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Obras, eléctrica y accesorios • Fichas + guías • v3.2 · act. 04/10/25
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Obra', 'Eléctrica', 'Completo'].map((t) => (
                        <span key={t} className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 text-xs px-3 py-1">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="/catalogo/trefi.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-gray-100 text-gray-900 px-3 py-2 text-sm hover:bg-gray-200"
                    title="Ver en el navegador"
                  >
                    Ver
                  </a>
                  <a
                    href="/catalogo/trefi.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-[#e04f01] text-[#e04f01] px-4 py-2.5 text-sm hover:bg-[#e04f01]/5 font-heading"
                    title="Descargar PDF"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* DERECHA: solo “¿Necesitás avanzar hoy?” (la otra tarjeta se eliminó) */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-[#e04f01]/10 p-6 shadow-xl ring-1 ring-[#e04f01]/15">
              <h3 className="text-base font-semibold text-gray-900">¿Necesitás avanzar hoy?</h3>
              <p className="mt-2 text-sm text-gray-700">Enviá planos por WhatsApp o contactanos de 9 a 18 h.</p>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => openWhatsApp('Hola, te contacto desde la web de Geneve!.')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e04f01] text-[#e04f01] px-4 py-2.5 text-sm hover:bg-[#e04f01]/10 font-heading"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>

                {/* “Email” -> “Contacto” y va a /contact */}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 font-heading"
                >
                  Contacto
                </Link>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 text-sm">
                <div className="text-gray-600">Teléfono</div>
                <div className="font-medium text-gray-900">+54 11 5927-8803</div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
};

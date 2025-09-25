// src/pages/Works.tsx
import React from 'react';
import { ShoppingCart, MessageCircle, Upload, FileSpreadsheet } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ProductCarousel } from '../components/product/ProductCarousel';

export const Works: React.FC = () => {
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '5491112345678';

  const openWhatsApp = (text: string) => {
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Carousel de productos/categorías (podés editar imágenes y rutas)
  const carouselItems = [
    { id: '1', name: 'CAJAS TÉRMICAS', to: '/product/caja-para-termica', imageUrl: 'https://i.postimg.cc/dt8trw5b/Screenshot-2025-09-21-at-4-13-10-PM.png' },
    { id: '2', name: 'DISYUNTORES', to: '/product/disyuntor-diferencial-25a-30ma', imageUrl: 'https://i.postimg.cc/7PFDXhhB/Screenshot-2025-09-21-at-4-20-15-PM.png' },
    { id: '3', name: 'LUCES DE EMERGENCIA', to: '/product/cartel-luminoso-salida-emergencia', imageUrl: 'https://i.postimg.cc/cC83S2MQ/Screenshot-2025-09-21-at-4-15-20-PM.png' },
    { id: '4', name: 'CAÑOS CORRUGADOS', to: '/product/canos-corrugados', imageUrl: 'https://i.postimg.cc/44m2y1JM/Screenshot-2025-09-21-at-4-16-46-PM.png' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16">

        {/* === NUEVO: Carrusel arriba de todo === */}
        <section className="mb-12 -mt-4">
          <ProductCarousel items={carouselItems} />
        </section>

        {/* CTA arriba de todo - fondo naranja translúcido, sin borde */}
        <div className="text-center bg-[#e04f01]/10 rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para cotizar tu proyecto?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Contanos qué necesitás y te asesoramos sin costo para armar tu pedido
            con precios y disponibilidad actualizados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              onClick={() =>
                openWhatsApp('Hola Geneve, quiero cotizar un proyecto de obras.')
              }
              className="inline-flex items-center space-x-2 border-2 border-[#e04f01] text-gray-900 hover:bg-[#e04f01]/10"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contactar por WhatsApp</span>
            </Button>
          </div>
        </div>

        {/* Título / Intro */}
        <div className="text-center mb-10 mt-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Presupuesto para Obras
          </h1>
          <p className="text-xl text-gray-600 max-w-1xl mx-auto leading-relaxed">
            Nuestro equipo puede ayudarte a elegir los productos adecuados para tu proyecto
            de construcción y armar un presupuesto personalizado.
          </p>
        </div>

        {/* Formulario de obras + Sidebar */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* FORM */}
          <section className="lg:col-span-3">
            {/* === CAMBIO: fondo naranja translúcido + sombra === */}
            <div className="rounded-2xl bg-[#e04f01]/10 shadow-xl ring-1 ring-[#e04f01]/15">
              <div className="border-b border-[#e04f01]/20 p-6">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-5 w-5 grid place-items-center rounded-full bg-white/70 text-gray-700">1</span> Datos
                  </span>
                  <span className="opacity-50">/</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-5 w-5 grid place-items-center rounded-full bg-white/70 text-gray-700">2</span> Alcance
                  </span>
                  <span className="opacity-50">/</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-5 w-5 grid place-items-center rounded-full bg-white/70 text-gray-700">3</span> Plazos
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-gray-900">Contanos sobre tu obra</h2>
                <p className="mt-1.5 text-sm text-gray-700">
                  Completá el formulario. Si es necesario, coordinamos una visita para relevar.
                </p>
              </div>

              <form className="p-6 space-y-8" onSubmit={(e) => e.preventDefault()}>
                {/* Datos de contacto */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-800">Responsable / Compras</label>
                    <input
                      type="text"
                      placeholder="Nombre y apellido"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-800">Empresa / CUIT</label>
                    <input
                      type="text"
                      placeholder="Razón social – CUIT"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-800">Email</label>
                    <input
                      type="email"
                      placeholder="nombre@empresa.com"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-800">Teléfono</label>
                    <input
                      type="tel"
                      placeholder="+54 11 5555 5555"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                    />
                  </div>
                </div>

                {/* Alcance */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-800">Tipo de obra</label>
                    <select className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30">
                      <option>Obra nueva</option>
                      <option>Remodelación</option>
                      <option>Ampliación</option>
                      <option>Mantenimiento</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-800">Rubro principal</label>
                    <select className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30">
                      <option>Eléctrico</option>
                      <option>Hidrosanitario</option>
                      <option>Climatización</option>
                      <option>Automatización</option>
                      <option>Iluminación</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-800">Superficie estimada</label>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        placeholder="0"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                      />
                      <span className="text-sm text-gray-600">m²</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-800">Cantidad de unidades</label>
                    <input
                      type="number"
                      min={0}
                      placeholder="depart., locales, etc."
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-800">Etapa</label>
                    <select className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30">
                      <option>Anteproyecto</option>
                      <option>Proyecto ejecutivo</option>
                      <option>Licitación</option>
                      <option>Ejecución</option>
                    </select>
                  </div>
                </div>

                {/* Ubicación y plazos */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-800">Ubicación de la obra</label>
                    <input
                      type="text"
                      placeholder="Dirección / Ciudad / Provincia"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-800">Fecha de inicio estimada</label>
                    <input
                      type="date"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm text-gray-800">Descripción técnica / alcances</label>
                  <textarea
                    rows={4}
                    placeholder="Listá ítems principales, cantidades, normas exigidas, observaciones…"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                  />
                </div>

                {/* Archivos + Extra */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-800">Adjuntar pliegos / planos</label>
                    <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white/60 px-4 py-3 text-sm text-gray-800 hover:bg-white">
                      <Upload className="h-4 w-4" />
                      Subir PDF, DWG, JPG… (máx. 20 MB)
                      <input type="file" className="sr-only" />
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-800">Plantilla de carga (opcional)</label>
                    <a
                      href="#"
                      className="mt-2 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 hover:bg-gray-50"
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                      Descargar plantilla XLS
                    </a>
                  </div>
                </div>

                {/* Consentimiento */}
                <div className="flex items-start gap-3">
                  <input
                    id="acepto"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#e04f01] focus:ring-[#e04f01]/40"
                  />
                  <label htmlFor="acepto" className="text-sm text-gray-800">
                    Acepto ser contactado por Geneve y la{' '}
                    <a href="#" className="text-[#e04f01] hover:underline">política de privacidad</a>.
                  </label>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#e04f01] text-white hover:bg-[#e04f01]/90"
                  >
                    Solicitar presupuesto de obra
                  </Button>

                  <Button
                    variant="outline"
                    className="inline-flex items-center gap-2 border-2 border-[#e04f01] text-gray-900 hover:bg-[#e04f01]/10"
                    onClick={() =>
                      openWhatsApp('Hola Geneve, envío planos por WhatsApp para cotización de obra.')
                    }
                  >
                    <MessageCircle className="h-5 w-5" />
                    Enviar por WhatsApp
                  </Button>
                </div>
              </form>
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className="lg:col-span-2 space-y-6">
            {/* === CAMBIO: fondo naranja translúcido + sombra === */}
            <div className="rounded-2xl bg-[#e04f01]/10 p-6 shadow-xl ring-1 ring-[#e04f01]/15">
              <h3 className="text-base font-semibold text-gray-900">Pensado para obras</h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-800">
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span> Cotización por ítems y metrado.</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span> Ajuste por hitos y entregas programadas.</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span> Productos homologados y certificados.</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span> Equipo técnico para obra y postventa.</li>
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                  <div className="text-lg font-semibold text-gray-900">+350</div>
                  <div className="text-[11px] text-gray-600">obras</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                  <div className="text-lg font-semibold text-gray-900">+15</div>
                  <div className="text-[11px] text-gray-600">años</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                  <div className="text-lg font-semibold text-gray-900">24 h</div>
                  <div className="text-[11px] text-gray-600">respuesta</div>
                </div>
              </div>
            </div>

            {/* === CAMBIO: fondo naranja translúcido + sombra === */}
            <div className="rounded-2xl bg-[#e04f01]/10 p-6 shadow-xl ring-1 ring-[#e04f01]/15">
              <h3 className="text-base font-semibold text-gray-900">¿Necesitás avanzar hoy?</h3>
              <p className="mt-2 text-sm text-gray-700">
                Enviá planos por WhatsApp o llamanos de 9 a 18 h.
              </p>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => openWhatsApp('Hola, necesito coordinar una visita técnica para mi obra.')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e04f01] text-[#e04f01] px-4 py-2.5 text-sm hover:bg-[#e04f01]/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>
                <a
                  href="mailto:info@geneve.com.ar"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50"
                >
                  Email
                </a>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 text-sm">
                <div className="text-gray-600">Teléfono</div>
                <div className="font-medium text-gray-900">+54 11 5555-5555</div>
                <div className="mt-2 text-gray-600">Oficina</div>
                <div className="font-medium text-gray-900">Av. Siempreviva 742, CABA</div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Award, Users, CheckCircle } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCarousel } from '../components/product/ProductCarousel';
import { useCart } from '../store/CartContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';

export const Home: React.FC = () => {
  const { addItem } = useCart();
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '5491159278803';

  const featuredProducts = productsData.filter(product => product.featured).slice(0, 8);

  const handleAddToQuote = (productId: string) => {
    const product = productsData.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        image: product.images[0],
        sku: product.sku,
      });
      showToast('Product added to quote!', 'success');
    }
  };

  // ↓↓↓ items para el carrusel (8 productos)
  const carouselItems = [
    { id: '1', name: 'DETECTOR DE HUMO', imageUrl: 'https://i.postimg.cc/7P13nc2j/Screenshot-2025-09-10-at-9-38-23-PM.png' },
    { id: '2', name: 'BOMBA CIRCULANTE', imageUrl: 'https://i.postimg.cc/SKz82t4T/Screenshot-2025-09-10-at-9-40-15-PM.png' },
    { id: '3', name: 'BOMBA PERIFÉRICA', imageUrl: 'https://i.postimg.cc/QM59x9gv/Screenshot-2025-09-10-at-9-41-31-PM.png' },
    { id: '4', name: 'PROTECTOR DE TENSIÓN ENCHUFABLE', imageUrl: 'https://i.postimg.cc/3x0Wn4qW/Screenshot-2025-09-10-at-9-42-49-PM.png' },
    { id: '5', name: 'INTERRUPTOR DIGITAL WIFI', imageUrl: 'https://i.postimg.cc/vTDGTCFD/Screenshot-2025-09-10-at-9-44-22-PM.png' },
    { id: '6', name: 'TEMPORIZADOR DIGITAL', imageUrl: 'https://i.postimg.cc/y6rVt6cR/Screenshot-2025-09-10-at-9-45-06-PM.png' },
    { id: '7', name: 'REFLECTOR LED', imageUrl: 'https://i.postimg.cc/J4fR7TT4/Screenshot-2025-09-10-at-9-46-35-PM.png' },
    { id: '8', name: 'LUZ DE EMERGENCIA', imageUrl: 'https://i.postimg.cc/ZKdhQ8Tk/Screenshot-2025-09-10-at-9-47-35-PM.png' },
  ];

  // Efecto tilt 3D para la tarjeta del hero
  React.useEffect(() => {
    const card = document.getElementById('tilt');
    const inner = card?.querySelector('div.relative') as HTMLDivElement | null;
    if (!card || !inner) return;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const handle = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = clamp((0.5 - py) * 10, -8, 8);   // rotación X
      const ry = clamp((px - 0.5) * 12, -10, 10); // rotación Y
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };
    const reset = () => { inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)'; };

    card.addEventListener('mousemove', handle);
    card.addEventListener('mouseleave', reset);
    return () => {
      card.removeEventListener('mousemove', handle);
      card.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative isolate overflow-hidden py-20 [--brand:#e84e1b] bg-[color:var(--brand)]">
        {/* Fondo moderno */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,_rgba(255,255,255,.22),_transparent_60%),radial-gradient(900px_500px_at_10%_120%,_rgba(0,0,0,.18),_transparent_40%)]"></div>
          <div className="absolute inset-0 opacity-[.18] mix-blend-overlay bg-[linear-gradient(transparent_39px,_rgba(255,255,255,1)_40px),linear-gradient(90deg,transparent_39px,_rgba(255,255,255,1)_40px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Contenedor con perspectiva */}
        <div className="mx-auto max-w-6xl px-6 [perspective:1200px]">
          {/* Card 3D */}
          <div id="tilt" className="relative mx-auto max-w-4xl will-change-transform transition-transform duration-300 [transform-style:preserve-3d]">
            <div className="pointer-events-none absolute -inset-[2px] rounded-[28px] bg-gradient-to-br from-white/30 via-white/10 to-transparent blur-xl opacity-60"></div>

            <div className="relative rounded-[26px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,.35)] px-8 sm:px-12 py-12 text-center text-white [transform-style:preserve-3d]">
              <span className="hidden sm:block absolute -top-4 -left-4 h-24 w-24 rounded-2xl bg-white/15 border border-white/25 shadow-lg [transform:translateZ(55px)]"></span>
              <span className="hidden sm:block absolute -bottom-6 -right-6 h-28 w-28 rounded-2xl bg-black/10 border border-white/15 shadow-xl [transform:translateZ(35px)]"></span>

              {/* Título con imagen (misma altura que el texto) */}
              <h2 className="text-3xl sm:text-9xl font-extrabold tracking-tight leading-none [transform:translateZ(60px)]">
                <img
                  src="/titulo.png"
                  alt="GENEVE"
                  className="mx-auto block h-[1em] w-auto select-none pointer-events-none align-middle [filter:drop-shadow(0_2px_0_rgba(0,0,0,.15))]"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-white/85 text-lg [transform:translateZ(50px)]">
                Recibí una cotización a medida para tu obra y el asesoramiento de nuestro equipo técnico.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${whatsappPhone}?text=Hola%20Geneve%2C%20quiero%20hacer%20una%20consulta.`}
                  className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-[#e84e1b] text-base font-semibold bg-white shadow-[0_8px_24px_rgba(0,0,0,.25)] ring-1 ring-black/10 hover:translate-y-[-1px] transition [transform:translateZ(70px)]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                    <path d="M19.11 17.32a1 1 0 0 0-1.42 0l-.36.36a10.53 10.53 0 0 1-2.49-1.69 10.45 10.45 0 0 1-1.69-2.49l.36-.36a1 1 0 0 0 0-1.42l-2.13-2.14a1 1 0 0 0-1.42 0l-.75.76a2.56 2.56 0 0 0-.54 2.91 17.91 17.91 0 0 0 3.56 5.12 17.89 17.89 0 0 0 5.12 3.56 2.56 2.56 0 0 0 2.91-.54l.76-.75a1 1 0 0 0 0-1.42Z"/>
                  </svg>
                  WhatsApp
                </a>

                <a
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-semibold text-white bg-transparent ring-1 ring-white/60 hover:ring-white hover:bg-white/10 transition shadow-[inset_0_0_0_1px_rgba(255,255,255,.25)] [transform:translateZ(65px)]"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-7H6.4M7 13L5.4 5M7 13l-2 7m12-7l2 7M9 21h0m6 0h0"/>
                  </svg>
                  Ver Presupuesto
                </a>
              </div>

              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/80 [transform:translateZ(45px)]">
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/70"></span> +350 obras</span>
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/70"></span> Productos certificados</span>
                <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/70"></span> Envíos a todo el país</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === CARRUSEL EN FILA === */}
      <section className="py-10 bg-white">
        <Container>
          <ProductCarousel items={carouselItems} />
        </Container>
      </section>

      {/* === (Sección “Nuestro Catálogo” eliminada por pedido) === */}

      {featuredProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-1xl lg:text-4xl font-bold text-gray-900 mb-4">
                Todos los Productos
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explora soluciones confiables y de alta calidad diseñadas para cada necesidad.
              </p>
            </div>

            {/* Cambiado a 4 columnas en desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToQuote={handleAddToQuote}
                />
              ))}
            </div>

            <div className="text-center mt-12">
  <Button
    as={Link}
    to="/catalog"
    variant="outline"
    size="lg"
    className="inline-flex items-center space-x-2 border border-[#e84e1b] text-[#e84e1b] hover:bg-[#e84e1b]/10 focus-visible:ring-2 focus-visible:ring-[#e84e1b]/30"
  >
    <span>Ver todos los Productos</span>
    <ArrowRight className="w-5 h-5" />
  </Button>
</div>

          </Container>
        </section>
      )}

      {/* Presupuestos – Hero 3D (fondo blanco continuo) */}
      <section className="relative isolate overflow-hidden py-20 [--brand:#ff5c02] bg-white">
        <Container>
          <div className="mx-auto max-w-6xl px-6 [perspective:1200px]">
            <div className="relative mx-auto max-w-4xl">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[26px] bg-[color:var(--brand)] -z-10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,_rgba(255,255,255,.22),_transparent_60%),radial-gradient(900px_500px_at_10%_120%,_rgba(0,0,0,.18),_transparent_40%)]" />
                <div className="absolute inset-0 opacity-[.08] mix-blend-overlay bg-[linear-gradient(transparent_39px,_rgba(255,255,255,.8)_40px),linear-gradient(90deg,transparent_39px,_rgba(255,255,255,.8)_40px)] bg-[size:40px_40px]" />
              </div>

              <div
                id="tilt"
                className="relative mx-auto max-w-4xl will-change-transform transition-transform duration-300 [transform-style:preserve-3d]"
              >
                <div className="pointer-events-none absolute -inset-[2px] rounded-[28px] bg-gradient-to-br from-white/30 via-white/10 to-transparent blur-xl opacity-60"></div>

                <div className="relative rounded-[26px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,.35)] px-8 sm:px-12 py-12 text-center text-white [transform-style:preserve-3d]">
                  <span className="hidden sm:block absolute -top-4 -left-4 h-24 w-24 rounded-2xl bg-white/15 border border-[#e84e1b] shadow-lg [transform:translateZ(55px)]"></span>
                  <span className="hidden sm:block absolute -bottom-6 -right-6 h-28 w-28 rounded-2xl bg-black/10 border border-[#e84e1b] shadow-xl [transform:translateZ(35px)]"></span>

                  <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#e84e1b] bg-white/10 px-3 py-1 text-xs text-white [transform:translateZ(40px)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-300"></span> Respuesta en menos de 24 h
                  </div>

                  <h2 className="text-3xl sm:text-5xl text-white font-extrabold tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,.15)] [transform:translateZ(60px)]">
                    ¿Buscás un Presupuesto?
                  </h2>

                  <p className="mx-auto mt-3 max-w-2xl text-white text-lg [transform:translateZ(50px)]">
                    Recibí una cotización a medida para tu obra y el asesoramiento de nuestro equipo técnico.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="https://wa.me/5491159278803?text=Hola%20Geneve%2C%20necesito%20un%20presupuesto."
                      target="_blank" rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-white text-base font-semibold bg-[#e84e1b] shadow-[0_8px_24px_rgba(0,0,0,.25)] ring-1 ring-black/10 hover:translate-y-[-1px] transition [transform:translateZ(70px)]"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                        <path d="M19.11 17.32a1 1 0 0 0-1.42 0l-.36.36a10.53 10.53 0 0 1-2.49-1.69 10.45 10.45 0 0 1-1.69-2.49l.36-.36a1 1 0 0 0 0-1.42l-2.13-2.14a1 1 0 0 0-1.42 0l-.75.76a2.56 2.56 0 0 0-.54 2.91 17.91 17.91 0 0 0 3.56 5.12 17.89 17.89 0 0 0 5.12 3.56 2.56 2.56 0 0 0 2.91-.54l.76-.75a1 1 0 0 0 0-1.42Z" />
                      </svg>
                      WhatsApp
                    </a>

                    <a
                      href="/cart"
                      className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-semibold text-white bg-transparent ring-1 ring-[#e84e1b] hover:ring-white hover:bg-white/10 transition shadow-[inset_0_0_0_1px_rgba(255,255,255,.25)] [transform:translateZ(65px)]"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-7H6.4M7 13L5.4 5M7 13l-2 7m12-7l2 7M9 21h0m6 0h0" />
                      </svg>
                      Ver Presupuesto
                    </a>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white [transform:translateZ(45px)]">
                    <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#e84e1b]"></span> +350 obras</span>
                    <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#e84e1b]"></span> Productos certificados</span>
                    <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#e84e1b]"></span> Envíos a todo el país</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Script tilt/parallax (vanilla) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const card = document.getElementById('tilt');
              const inner = card?.querySelector('div.relative');
              const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
              function handle(e){
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                const rx = clamp((0.5 - py) * 10, -8, 8);
                const ry = clamp((px - 0.5) * 12, -10, 10);
                inner.style.transform = \`rotateX(\${rx}deg) rotateY(\${ry}deg) translateZ(0)\`;
              }
              function reset(){ inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)'; }
              card?.addEventListener('mousemove', handle);
              card?.addEventListener('mouseleave', reset);
            `,
          }}
        />
      </section>

      {/* Trust & Info Section */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl lg:text-4xl font-bold text-gray-900 mb-6">
                Acerca de <span className="text-[#e04f01]">GENEVE</span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Geneve cuenta con más de 40 años de trayectoria en el mercado, ofreciendo soluciones integrales en electricidad e iluminación.
                Nuestro compromiso con la innovación y la excelencia nos ha permitido evolucionar constantemente, adaptándonos a las exigencias del sector y a las necesidades de nuestros clientes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#e84e1b] mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Calidad Certificada</h3>
                    <p className="text-gray-600 text-sm">Todos los productos cumplen con normas internacionales</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-[#e84e1b] mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Soporte Experto</h3>
                    <p className="text-gray-600 text-sm">Asistencia técnica de nuestro equipo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-[#e84e1b] mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">+40 Años</h3>
                    <p className="text-gray-600 text-sm">Trayectoria al servicio de la industria de la construcción</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-6 h-6 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Documentación</h3>
                    <p className="text-gray-600 text-sm">Manuales y guías completas</p>
                  </div>
                </div>
              </div>

              <Link
                to="/certifications"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                <span>Ver Certificaciones</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#e04f01] rounded-xl p-8 text-white text-center">
                <div className="text-3xl font-bold mb-2">+50</div>
                <div className="text-orange-100">Productos en Catálogo</div>
              </div>
              <div className="bg-[#e04f01] rounded-xl p-8 text-white text-center">
                <div className="text-3xl font-bold mb-2">40+</div>
                <div className="text-gray-300">Años de Experiencia</div>
              </div>
              <div className="bg-[#e04f01] rounded-xl p-8 text-white text-center">
                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-green-100">Satisfacción de Clientes</div>
              </div>
              <div className="bg-[#e04f01] rounded-xl p-8 text-white text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Soporte Disponible</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

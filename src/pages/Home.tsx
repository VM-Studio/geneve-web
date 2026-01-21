import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Award, Users, CheckCircle } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { ProductCarousel } from '../components/product/ProductCarousel';
import { useCart } from '../store/CartContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';
import { Seo } from '../components/Seo'; // ← SEO
import { track } from '../analytics/track'; // ← tracking GTM

export const Home: React.FC = () => {
  const { addItem } = useCart();
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '5491159278803';

  const featuredProducts = productsData.filter(p => p.featured);
  const gridProducts = featuredProducts.slice(0, 4); // 4 productos (2x2)

  const handleAddToQuote = (productId: string, indexInGrid?: number) => {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    // 🔹 Métrica: click en "Agregar"
    try {
      track('cta_add_to_quote_click', {
        source: 'home_grid',
        path: typeof window !== 'undefined' ? window.location.pathname : '',
        position: typeof indexInGrid === 'number' ? indexInGrid : null,
        product_id: product.id,
        product_name: product.name,
        sku: product.sku || '',
      });
    } catch {}

    const image = (product.images?.[0] ?? '') as string;
    const sku = product.sku ?? '';
    addItem({ id: product.id, name: product.name, image, sku });
    showToast('¡Producto agregado al presupuesto!', 'success');
  };

  // Carrusel superior
  const carouselItems = [
    { id: '1', name: 'CABLES', to: '/product/caja-para-termica', imageUrl: "/productos/catalogo/cabless.png" },
    { id: '4', name: 'CAÑOS CORRUGADOS', to: '/product/canos-corrugados', imageUrl: 'https://i.postimg.cc/zGtm6kNb/Screenshot-2025-10-03-at-7-37-30-AM.png' },
    { id: '2', name: 'DISYUNTORES', href: '/product/disyuntor-diferencial-25a-30ma', imageUrl: 'https://i.postimg.cc/k48CjWvx/Screenshot-2025-09-25-at-8-29-38-AM.png' },
    { id: '3', name: 'LUCES DE EMERGENCIA', to: '/product/luz-emergencia-60leds', imageUrl: 'https://i.postimg.cc/V6tHt8jR/Screenshot-2025-09-25-at-9-36-53-AM.png' },
    { id: '5', name: 'CAJAS TÉRMICAS', to: '/product/caja-para-termica', imageUrl: 'https://i.postimg.cc/dt8trw5b/Screenshot-2025-09-21-at-4-13-10-PM.png' },
  ];

  // Tilt 3D (hero + presupuesto)
  React.useEffect(() => {
    const ids = ['tilt-hero', 'tilt-quote'];
    const cards: HTMLElement[] = [];
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

    ids.forEach(id => {
      const card = document.getElementById(id);
      const inner = card?.querySelector('div.relative') as HTMLDivElement | null;
      if (!card || !inner) return;

      const handle = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = clamp((0.5 - py) * 10, -8, 8);
        const ry = clamp((px - 0.5) * 12, -10, 10);
        inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      };
      const reset = () => { inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)'; };

      card.addEventListener('mousemove', handle);
      card.addEventListener('mouseleave', reset);
      (card as any).__tiltHandlers = { handle, reset };
      cards.push(card);
    });

    return () => {
      cards.forEach(card => {
        const { handle, reset } = (card as any).__tiltHandlers || {};
        if (handle) card.removeEventListener('mousemove', handle);
        if (reset) card.removeEventListener('mouseleave', reset);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* SEO */}
      <Seo
        title="Geneve — Construcción, Seguridad e Iluminación"
        description="Catálogo de productos Geneve: soluciones en electricidad, seguridad e iluminación para obras residenciales y comerciales. Asesoramiento técnico y envíos a todo el país."
        pathname="/"
        image="/og/home.jpg"
        keywords={[
          'Geneve',
          'catálogo de productos',
          'electricidad',
          'iluminación',
          'seguridad',
          'obras',
          'disyuntores',
          'luces de emergencia',
          'caños corrugados'
        ]}
      />

      {/* Hero - Dos columnas */}
      <section className="relative isolate overflow-hidden bg-white">
        <Container className="py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Columna Izquierda - Contenido */}
            <div className="space-y-7 lg:pr-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Soluciones Eléctricas para tu Obra
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
                Proveemos productos eléctricos certificados de alta calidad para obras residenciales y comerciales. Asesoramiento técnico y envíos a todo el país.
              </p>
              
              <div className="pt-4">
                <Button
                  as={Link}
                  to="/catalog"
                  size="lg"
                  className="inline-flex items-center space-x-2 bg-[#e67a5d] text-white hover:bg-[#e67a5d]/90 rounded-none"
                >
                  <span>Ver Catálogo</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Columna Derecha - Imagen */}
            <div className="relative lg:pl-8 lg:scale-110">
              <div className="aspect-[5/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/productos/catalogo/cabless.png"
                  alt="Productos Geneve"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Carrusel categorías */}
      <section className="py-10 bg-white">
        <Container>
          <ProductCarousel items={carouselItems} />
          <div className="mb-10 md:mb-12 xl:mb-16 grid grid-cols-[1fr_auto_1fr] items-center">
            <Link
              to="/catalog"
              className="col-start-3 justify-self-end inline-flex items-center gap-1 font-semibold text-[#e84e1b] hover:underline text-[clamp(14px,2.2vw,20px)]"
              aria-label="Ir al catálogo"
              onClick={() =>
                track('cta_catalog_link_click', {
                  source: 'home_carousel_block',
                  path: typeof window !== 'undefined' ? window.location.pathname : '',
                })
              }
            >
              Catálogo
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* =================== 4 PRODUCTOS — DISEÑO HORIZONTAL (2x2) =================== */}
      {gridProducts.length > 0 && (
        <section className="bg-white pt-4 pb-14">
          <Container>
            <div className="text-center mb-8">
              <h2 className="font-extrabold tracking-tight leading-tight text-[clamp(18px,4.5vw,44px)]">
                Todos los Productos
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Explora soluciones confiables y de alta calidad diseñadas para cada necesidad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gridProducts.map((p, idx) => {
                const img = (p.images?.[0] ?? '') as string;
                return (
                  <article
                    key={p.id}
                    className="rounded-2xl bg-white ring-1 ring-zinc-200 shadow-[0_20px_60px_-30px_rgba(2,6,23,.12)] p-5 sm:p-6"
                  >
                    {/* 2 columnas: imagen fija + texto con ancho máximo */}
                    <div className="grid grid-cols-[180px_1fr] sm:grid-cols-[220px_1fr] gap-6 sm:gap-8 items-start">
                      {/* Imagen con remarco naranja (clickeable) */}
                      <Link
                        to={`/product/${p.id}`}
                        aria-label={`Ver detalle de ${p.name}`}
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e84e1b] rounded-2xl"
                        onClick={() =>
                          track('cta_view_product_click', {
                            source: 'home_grid_image',
                            path: typeof window !== 'undefined' ? window.location.pathname : '',
                            position: idx,
                            product_id: p.id,
                            product_name: p.name,
                            sku: p.sku || '',
                          })
                        }
                      >
                        <img
                          src={img}
                          alt={p.name}
                          className="h-[180px] w-[180px] sm:h-[220px] sm:w-[220px] object-contain rounded-2xl p-3 bg-white ring-2 ring-[#e84e1b] transition hover:scale-[1.02]"
                          loading="lazy"
                          decoding="async"
                        />
                      </Link>

                      {/* Contenido con ancho máximo controlado */}
                      <div className="max-w-[55ch] sm:max-w-[30ch]">
                        <h3 className="font-[Sora] text-[clamp(20px,2.8vw,32px)] font-extrabold tracking-tight">
                          {p.name}
                        </h3>
                        <p className="mt-3 text-zinc-700 text-[15.5px]/relaxed line-clamp-6">
                          {p.description ?? 'Producto de alta confiabilidad para obras y proyectos exigentes.'}
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleAddToQuote(p.id, idx)}
                            className="inline-flex items-center justify-center rounded-full px-0 py-2 text-sm font-semibold text-[#e84e1b] hover:underline"
                            aria-label={`Agregar ${p.name}`}
                          >
                            Agregar
                          </button>

                          <Link
                            to={`/product/${p.id}`}
                            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-2 text-sm font-semibold hover:bg-zinc-50 whitespace-nowrap"
                            aria-label={`Ver detalle de ${p.name}`}
                            onClick={() =>
                              track('cta_view_product_click', {
                                source: 'home_grid_button',
                                path: typeof window !== 'undefined' ? window.location.pathname : '',
                                position: idx,
                                product_id: p.id,
                                product_name: p.name,
                                sku: p.sku || '',
                              })
                            }
                          >
                            Ver detalle
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Button
                as={Link}
                to="/catalog"
                size="lg"
                className="inline-flex items-center gap-2 rounded-2xl
                          !bg-[#e84e1b] !text-white !font-extrabold !font-[Sora]
                          !border-2 !border-[#e84e1b]
                          hover:!bg-[#d94b17] focus-visible:!ring-2 focus-visible:!ring-[#e84e1b]/40
                          !px-8 !py-4 text-[clamp(16px,2.2vw,20px)]"
                onClick={() =>
                  track('cta_view_all_products_click', {
                    source: 'home_grid_footer',
                    path: typeof window !== 'undefined' ? window.location.pathname : '',
                  })
                }
              >
                <span>Ver todos los Productos</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Presupuestos con efecto y botones funcionando */}
      <section className="relative isolate overflow-hidden py-20 [--brand:#ff5c02] bg-white">
        <Container>
          <div className="mx-auto max-w-6xl px-6 [perspective:1200px]">
            <div className="relative mx-auto max-w-4xl">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[26px] bg-[color:var(--brand)] -z-10 overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_600px_at_50%_-10%,_rgba(255,255,255,.22),_transparent_60%),radial-gradient(900px_500px_at_10%_120%,_rgba(0,0,0,.18),_transparent_40%)]" />
                <div className="absolute inset-0 pointer-events-none opacity-[.08] mix-blend-overlay bg-[linear-gradient(transparent_39px,_rgba(255,255,255,.8)_40px),linear-gradient(90deg,transparent_39px,_rgba(255,255,255,.8)_40px)] bg-[size:40px_40px]" />
              </div>

              <div
                id="tilt-quote"
                className="relative mx-auto max-w-4xl will-change-transform transition-transform duration-300 [transform-style:preserve-3d]"
              >
                <div className="pointer-events-none absolute -inset-[2px] rounded-[28px] bg-gradient-to-br from-white/30 via-white/10 to-transparent blur-xl opacity-60"></div>

                <div className="relative rounded-[26px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,.35)] px-8 sm:px-12 py-12 text-center text-white [transform-style:preserve-3d]">
                  <span className="hidden sm:block absolute -top-4 -left-4 h-24 w-24 rounded-2xl bg-white/15 border border-[#e84e1b] shadow-lg [transform:translateZ(55px)] pointer-events-none"></span>
                  <span className="hidden sm:block absolute -bottom-6 -right-6 h-28 w-28 rounded-2xl bg-black/10 border border-[#e84e1b] shadow-xl [transform:translateZ(35px)] pointer-events-none"></span>

                  <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#e84e1b] bg-white/10 px-3 py-1 text-xs text-white [transform:translateZ(40px)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-300"></span> Respuesta en menos de 24 h
                  </div>

                  <h2 className="text-3xl sm:text-5xl text-white font-extrabold tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,.15)] [transform:translateZ(60px)]">
                    ¿Buscás un Presupuesto?
                  </h2>

                  <p className="mx-auto mt-3 max-w-1xl text-white  [transform:translateZ(50px)] font-heading">
                    Recibí una cotización a medida para tu obra y el asesoramiento de nuestro equipo técnico.
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white">
                    <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#e84e1b]"></span> +350 obras</span>
                    <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#e84e1b]"></span> Productos certificados</span>
                    <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#e84e1b]"></span> Envíos a todo el país</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Info */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl lg:text-4xl font-bold text-gray-900 mb-6">
                Acerca de <span className="text-[#e84e1b]">GENEVE</span>
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
                onClick={() =>
                  track('cta_view_certifications_click', {
                    source: 'home_about_block',
                    path: typeof window !== 'undefined' ? window.location.pathname : '',
                  })
                }
              >
                <span>Ver Certificaciones</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#e04f01] rounded-xl p-8 text-white text-center">
                <div className="text-3xl font-bold mb-2">+50</div>
                <div className="text-gray-300 font-heading">Productos en Catálogo</div>
              </div>
              <div className="bg-[#e04f01] rounded-xl p-8 text-white text-center">
                <div className="text-3xl font-bold mb-2">40+</div>
                <div className="text-gray-300 font-heading">Años de Experiencia</div>
              </div>
              <div className="bg-[#e04f01] rounded-xl p-8 text-white text-center">
                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-gray-300 font-heading">Satisfacción de Clientes</div>
              </div>
              <div className="bg-[#e04f01] rounded-xl p-8 text-white text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-gray-300 font-heading">Soporte Disponible</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

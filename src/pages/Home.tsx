import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lightbulb, Wrench, Zap, Clock, AlertTriangle, ToggleLeft, Download, Award, Users, CheckCircle } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCarousel } from '../components/product/ProductCarousel'; // ← NUEVO
import { useCart } from '../store/CartContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

export const Home: React.FC = () => {
  const { addItem } = useCart();
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '5491112345678';
  
  const featuredProducts = productsData.filter(product => product.featured).slice(0, 6);

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

  const categoryIcons = {
    security: Shield,
    lighting: Lightbulb,
    pumps: Wrench,
    'voltage-protectors': Zap,
    timers: Clock,
    'emergency-lights': AlertTriangle,
    switches: ToggleLeft,
  };

  // ↓↓↓ NUEVO: items para el carrusel (8 productos)
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
// Efecto tilt 3D para la tarjeta del hero (no requiere imports extra)
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
     <section className="relative isolate overflow-hidden py-20 [--brand:#ff5c02] bg-[color:var(--brand)]">
  {/* Fondo moderno */}
  <div className="absolute inset-0 -z-10">
    {/* degradé */}
    <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,_rgba(255,255,255,.22),_transparent_60%),radial-gradient(900px_500px_at_10%_120%,_rgba(0,0,0,.18),_transparent_40%)]"></div>
    {/* patrón suave */}
    <div className="absolute inset-0 opacity-[.18] mix-blend-overlay bg-[linear-gradient(transparent_39px,_rgba(255,255,255,1)_40px),linear-gradient(90deg,transparent_39px,_rgba(255,255,255,1)_40px)] bg-[size:40px_40px]"></div>

  </div>

  {/* Contenedor con perspectiva */}
  <div className="mx-auto max-w-6xl px-6 [perspective:1200px]">

    {/* Card 3D */}
    <div id="tilt"
         className="relative mx-auto max-w-4xl will-change-transform transition-transform duration-300 [transform-style:preserve-3d]">

      {/* brillo superior */}
      <div className="pointer-events-none absolute -inset-[2px] rounded-[28px] bg-gradient-to-br from-white/30 via-white/10 to-transparent blur-xl opacity-60"></div>

      {/* capa base (la tarjeta) */}
      <div className="relative rounded-[26px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,.35)] px-8 sm:px-12 py-12 text-center text-white
                  [transform-style:preserve-3d]">
        {/* adornos flotantes */}
        <span className="hidden sm:block absolute -top-4 -left-4 h-24 w-24 rounded-2xl bg-white/15 border border-white/25 shadow-lg
                     [transform:translateZ(55px)]"></span>
        <span className="hidden sm:block absolute -bottom-6 -right-6 h-28 w-28 rounded-2xl bg-black/10 border border-white/15 shadow-xl
                     [transform:translateZ(35px)]"></span>

        

        {/* Título → GENEVE */}
        <h2 className="text-3xl sm:text-9xl font-extrabold tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,.15)]
                   [transform:translateZ(60px)]">
          <span className="bg-white bg-clip-text text-transparent">GENEVE</span>
        </h2>

        {/* Subtítulo */}
        <p className="mx-auto mt-3 max-w-2xl text-white/85 text-lg [transform:translateZ(50px)]">
          Recibí una cotización a medida para tu obra y el asesoramiento de nuestro equipo técnico.
        </p>

        {/* Botones (mismo diseño visual) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${whatsappPhone}?text=Hola%20Geneve%2C%20quiero%20hacer%20una%20consulta.`}
            className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-slate-950 text-base font-semibold
                       bg-white shadow-[0_8px_24px_rgba(0,0,0,.25)] ring-1 ring-black/10 hover:translate-y-[-1px] transition
                       [transform:translateZ(70px)]"
          >
            {/* ícono WA */}
            <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M19.11 17.32a1 1 0 0 0-1.42 0l-.36.36a10.53 10.53 0 0 1-2.49-1.69 10.45 10.45 0 0 1-1.69-2.49l.36-.36a1 1 0 0 0 0-1.42l-2.13-2.14a1 1 0 0 0-1.42 0l-.75.76a2.56 2.56 0 0 0-.54 2.91 17.91 17.91 0 0 0 3.56 5.12 17.89 17.89 0 0 0 5.12 3.56 2.56 2.56 0 0 0 2.91-.54l.76-.75a1 1 0 0 0 0-1.42Z"/>
            </svg>
            WhatsApp
          </a>

          <a
            href="/quote"
            className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-semibold text-white
                       bg-transparent ring-1 ring-white/60 hover:ring-white hover:bg-white/10 transition
                       shadow-[inset_0_0_0_1px_rgba(255,255,255,.25)] [transform:translateZ(65px)]"
          >
            {/* ícono carrito */}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-7H6.4M7 13L5.4 5M7 13l-2 7m12-7l2 7M9 21h0m6 0h0"/>
            </svg>
            Ver Carrito
          </a>
        </div>

        {/* Mini trust */}
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

      {/* Category Highlights */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Catálogo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubrí nuestra amplia variedad de productos en construcción, seguridad e iluminación
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData.map((category) => {
              const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Wrench;
              
              return (
                <Link
                  key={category.id}
                  to={`/catalog?category=${category.id}`}
                  className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-orange-300 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 group-hover:bg-orange-500 transition-colors">
                    <IconComponent className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-orange-600 text-sm font-medium group-hover:text-orange-700">
                    <span>Ver productos</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Todos los Productos
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explora soluciones confiables y de alta calidad diseñadas para cada necesidad.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="inline-flex items-center space-x-2"
              >
                <span>Ver todos los Productos</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Container>
        </section>
      )}
      {/* Footer CTA */}
      <section className="relative isolate overflow-hidden py-12 bg-[#ff5c02] [--brand:#ff5c02]">
  {/* Fondo moderno */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_-10%,_rgba(255,255,255,.22),_transparent_60%),radial-gradient(700px_400px_at_10%_120%,_rgba(0,0,0,.18),_transparent_40%)]" />
    <div className="absolute inset-0 opacity-[.08] mix-blend-overlay bg-[linear-gradient(transparent_39px,_rgba(255,255,255,.8)_40px),linear-gradient(90deg,transparent_39px,_rgba(255,255,255,.8)_40px)] bg-[size:40px_40px]" />
  </div>

  <Container>
    <div className="[perspective:1200px]">
      <div
        id="tilt"
        className="relative mx-auto max-w-4xl will-change-transform transition-transform duration-300 [transform-style:preserve-3d]"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -inset-[2px] rounded-[24px] bg-gradient-to-br from-white/30 via-white/10 to-transparent blur-xl opacity-60" />

        {/* Card */}
        <div className="relative overflow-hidden rounded-[22px] border border-white/20 bg-white/10 px-6 py-8 text-white shadow-[0_12px_40px_rgba(0,0,0,.35)] backdrop-blur-xl sm:px-10 [transform-style:preserve-3d]">
          {/* Badge */}
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 [transform:translateZ(30px)]">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Obras & Licitaciones • Respuesta <span className="font-semibold">≤ 24 h</span>
          </div>

          {/* Title */}
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-extrabold tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,.15)] sm:text-4xl [transform:translateZ(45px)]">
            ¿Necesitás un <span className="bg-white/90 bg-clip-text text-transparent">Presupuesto de Obra</span>?
          </h2>

          {/* Bullets */}
          <ul className="mx-auto mt-4 grid max-w-3xl grid-cols-1 gap-2 text-sm text-white/85 sm:grid-cols-3 [transform:translateZ(35px)]">
            <li className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              Ítems por metrado y unidades
            </li>
            <li className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              Ajuste por hitos y entregas
            </li>
            <li className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              Productos certificados Geneve
            </li>
          </ul>

          {/* Subtítulo */}
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/85 [transform:translateZ(35px)]">
            Te derivamos a la sección de <strong>Presupuestos</strong> para cargar datos de tu obra, adjuntar pliegos/planos y coordinar una visita técnica.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              as={Link}
              to="/works"
              size="lg"
              className="group rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 ring-1 ring-black/10 shadow-[0_6px_16px_rgba(0,0,0,.25)] hover:translate-y-[-1px] transition [transform:translateZ(45px)]"
            >
              Ir a Presupuestos
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappPhone}?text=Hola%20Geneve%2C%20necesito%20un%20presupuesto%20para%20mi%20obra.`,
                  "_blank"
                )
              }
              className="rounded-xl border-white/60 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,.25)] [transform:translateZ(40px)]"
            >
              WhatsApp
            </Button>
          </div>

          {/* Trust */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/80 [transform:translateZ(35px)]">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> +350 obras
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Entregas por hito
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Cobertura nacional
            </span>
          </div>
        </div>
      </div>
    </div>
  </Container>

  {/* Script tilt */}
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
          const rx = clamp((0.5 - py) * 8, -6, 6);
          const ry = clamp((px - 0.5) * 10, -8, 8);
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
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Calidad Certificada</h3>
                    <p className="text-gray-600 text-sm">Todos los productos cumplen con normas internacionales</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Soporte Experto</h3>
                    <p className="text-gray-600 text-sm">Asistencia técnica de nuestro equipo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-purple-500 mt-0.5" />
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

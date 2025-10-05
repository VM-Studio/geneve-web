import React from 'react';
import { Grid, List } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { useCart } from '../store/CartContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { CatalogDownloadCard } from '../components/catalog/CatalogDownloadCard';


type Category = { id: string; name: string; imageUrl?: string };

/* ===================== Helpers de texto ===================== */
const normalize = (s: unknown) =>
  String(s ?? '')
    .normalize('NFD')
    // @ts-expect-error: unicode property escapes
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

const textHas = (text: string, ...needles: string[]) =>
  needles.some((n) => text.includes(normalize(n)));

const isAlarm = (product: any) => {
  const n = normalize(product.name);
  const tags = (product.tags ?? []).map((t: string) => normalize(t)).join(' ');
  return textHas(n, 'alarma', 'sirena', 'central') || textHas(tags, 'alarma', 'sirena', 'central');
};

const isMotionSensor = (product: any) => {
  const n = normalize(product.name);
  const tags = (product.tags ?? []).map((t: string) => normalize(t)).join(' ');
  return (
    (textHas(n, 'sensor') && textHas(n, 'movimiento')) ||
    textHas(n, 'pir') ||
    (textHas(tags, 'sensor') && textHas(tags, 'movimiento')) ||
    textHas(tags, 'pir', 'infrarrojo')
  );
};

/* ===== Iluminación: helpers ===== */
const isPanelLed = (product: any) => {
  const n = normalize(product.name);
  const tags = (product.tags ?? []).map((t: string) => normalize(t)).join(' ');
  return textHas(n, 'panel') || textHas(tags, 'panel', 'panel led', 'downlight');
};

const isReflector = (product: any) => {
  const n = normalize(product.name);
  const tags = (product.tags ?? []).map((t: string) => normalize(t)).join(' ');
  return (
    textHas(n, 'reflector', 'proyector', 'flood') ||
    textHas(tags, 'reflector', 'proyector', 'flood', 'exterior', 'ip65', 'ip66')
  );
};

/* ===================== Helpers de estilo (paleta GENEVE) ===================== */
const TopoTexture: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className ?? ''} viewBox="0 0 400 400" fill="none" aria-hidden>
    <path
      d="M0 60c120-30 200-30 320 0M0 120c120-24 200-24 320 0M0 180c120-24 200-24 320 0M0 240c120-24 200-24 320 0M0 300c120-24 200-24 320 0"
      stroke="currentColor"
      strokeWidth="1"
      className="text-black/5"
    />
  </svg>
);

const accentClass = (i: number) => (i % 2 === 0 ? 'bg-[#e84e1b]' : 'bg-gray-300');

export const Catalog: React.FC = () => {
  const { addItem } = useCart();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  // Subcategorías Seguridad
  const [securitySub, setSecuritySub] = React.useState<'Alarmas' | 'Sensores de Movimiento' | null>(null);
  const isSecurity = selectedCategory && normalize(selectedCategory) === 'seguridad';

  // Subcategorías Iluminación
  const [lightingSub, setLightingSub] = React.useState<'Paneles LED' | 'Reflectores' | null>(null);
  const isLighting = selectedCategory && normalize(selectedCategory) === 'iluminacion';

  React.useEffect(() => {
    if (!isSecurity) setSecuritySub(null);
  }, [isSecurity]);

  React.useEffect(() => {
    if (!isLighting) setLightingSub(null);
  }, [isLighting]);

  const categories: Category[] = React.useMemo(() => {
    const seen = new Set<string>();
    return (categoriesData as Category[]).filter((c) => {
      const key = c.name.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const productsOfSelected = React.useMemo(() => {
    if (!selectedCategory) return [];
    const sel = normalize(selectedCategory);
    return (productsData as any[])
      .filter((p) => normalize(p.category || '') === sel)
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [selectedCategory]);

  const productsOfSecuritySub = React.useMemo(() => {
    if (!isSecurity) return productsOfSelected;
    if (!securitySub) return [];
    if (securitySub === 'Alarmas') return productsOfSelected.filter(isAlarm);
    return productsOfSelected.filter(isMotionSensor);
  }, [isSecurity, securitySub, productsOfSelected]);

  const productsOfLightingSub = React.useMemo(() => {
    if (!isLighting) return productsOfSelected;
    if (!lightingSub) return [];
    if (lightingSub === 'Paneles LED') return productsOfSelected.filter(isPanelLed);
    return productsOfSelected.filter(isReflector);
  }, [isLighting, lightingSub, productsOfSelected]);

  const handleAddToQuote = (productId: string) => {
    const product = (productsData as any[]).find((p) => p.id === productId);
    if (!product) return;
    const image = (product.images?.[0] ?? '') as string;
    const sku = product.sku ?? '';
    addItem({ id: product.id, name: product.name, image, sku });
    showToast('¡Producto agregado al presupuesto!', 'success');
  };

  const cardBase: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
  };

  const title =
    isSecurity
      ? (securitySub ? `Seguridad — ${securitySub}` : '')
      : isLighting
        ? (lightingSub ? `Iluminación — ${lightingSub}` : '')
        : selectedCategory || 'Todas Nuestras Categorias';

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Header (título centrado + tarjeta debajo) */}
{/* Header principal */}
{!selectedCategory && (
  <div className="mb-8 space-y-4">
    <h1 className="text-center font-extrabold tracking-tight leading-tight text-[clamp(18px,3vw,52px)] whitespace-nowrap">
      Todas Nuestras Categorías
    </h1>
    <div className="w-full">
      <CatalogDownloadCard />
    </div>
  </div>
)}

{selectedCategory && (
  <div className="mb-8 text-center">
    <h1 className="font-extrabold tracking-tight leading-tight text-[clamp(18px,3vw,52px)] whitespace-nowrap">
      {title}
    </h1>
  </div>
)}


        

{/* ===================== CATEGORÍAS (diseño original) ===================== */}
{!selectedCategory && (
  <section>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {categories.map((cat, i) => {
        const img =
          cat.imageUrl ??
          'https://images.unsplash.com/photo-1589903619406-a9c9d5f9b2c3?q=80&w=1600&auto=format&fit=crop';

        const select = () => setSelectedCategory(cat.name);

        return (
          <article key={cat.id} className="w-full">
            <div
              className="
                group relative overflow-hidden rounded-2xl bg-white
                border border-zinc-200/80 ring-1 ring-black/[0.03]
                shadow-[0_10px_26px_-14px_rgba(2,6,23,0.25)]
                hover:shadow-[0_18px_46px_-20px_rgba(2,6,23,0.35)]
                transition
              "
            >
              {/* barrita superior naranja (original) */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-b from-[#e84e1b] to-[#e84e1b]/40" />
              <div className="absolute inset-x-0 top-[2px] h-px bg-black/5" />

              <div className="relative z-10 p-4 md:p-5">
                {/* Título centrado (original) */}
                <h3 className="text-center text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">
                  {cat.name}
                </h3>

                {/* Imagen SIN sombra + leve zoom (original) */}
                <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-xl bg-white">
                  {/* halo sutil para integrarla sin sombra */}
                  <div className="absolute inset-0 rounded-xl bg-[radial-gradient(60%_60%_at_50%_55%,rgba(232,78,27,0.08),transparent_65%)]" />
                  <img
                    src={img}
                    alt={cat.name}
                    loading="lazy"
                    className="
                      absolute inset-0 m-auto h-[86%] w-[86%] object-contain
                      scale-[1.03] group-hover:scale-[1.07]
                      transition-transform duration-500 ease-out
                    "
                  />
                </div>

                {/* CTA naranja (original) */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={select}
                    className="
                      inline-flex w-full items-center justify-center gap-2 rounded-xl
                      bg-[#e84e1b] text-white font-semibold
                      px-4 py-2 text-sm
                      hover:opacity-95 active:translate-y-[1px]
                      focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]/30
                    "
                    aria-label={`Ver productos de ${cat.name}`}
                  >
                    Ver productos
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
                      <path d="M13 5l7 7-7 7M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* borde interior sutil (original) */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/40 mix-blend-overlay" />
            </div>
          </article>
        );
      })}
    </div>
  </section>
)}






        {/* ===================== SUBCATEGORÍAS DE SEGURIDAD ===================== */}
        {isSecurity && !securitySub && (
          <section className="mt-6">
            {/* Botón + título centrado en la misma fila */}
            <div className="mb-6 grid grid-cols-[auto,1fr,auto] items-center gap-3 font-heading">
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                ← Volver a Categorías
              </Button>

              <h2 className="text-center text-5xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Nuestros Productos de <span className="text-[#e84e1b]">Seguridad</span>
              </h2>

              <Button variant="outline" className="opacity-0 pointer-events-none select-none">
                ← Volver a Categorías
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {/* Alarmas */}
              <article>
                <button
                  type="button"
                  onClick={() => setSecuritySub('Alarmas')}
                  aria-label="Alarmas"
                  className="
                    group relative block w-full overflow-hidden rounded-[28px]
                    bg-white/90 backdrop-blur ring-1 ring-zinc-200
                    shadow-[0_20px_60px_-28px_rgba(2,6,23,.35)]
                    hover:shadow-[0_30px_80px_-30px_rgba(2,6,23,.45)]
                    transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]/30
                  "
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-[#e84e1b]" />
                  <div className="p-6 md:p-8">
                    <h3 className="text-center text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                      Alarmas
                    </h3>
                    <div className="relative mt-5 aspect-[16/10] rounded-2xl border border-zinc-200/80 bg-white">
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(70%_70%_at_50%_60%,rgba(232,78,27,0.16),transparent_62%)]" />
                      <img
                        src="https://i.postimg.cc/4yqQz2N0/Screenshot-2025-09-29-at-7-32-45-AM.png"
                        alt="Alarmas"
                        className="absolute inset-0 h-full w-full object-cover object-center
           transition-transform duration-500 ease-out
           group-hover:scale-[1.05] rounded-2xl"
                      />
                    </div>
                    <div className="mt-6">
                      <div
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e84e1b] px-4 py-3 text-sm font-semibold text-white hover:opacity-95 active:translate-y-px transition"
                        aria-hidden="true"
                      >
                        Ver productos
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13 5l7 7-7 7M5 12h14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/60 mix-blend-overlay" />
                </button>
              </article>

              {/* Sensores de Movimiento */}
              <article>
                <button
                  type="button"
                  onClick={() => setSecuritySub('Sensores de Movimiento')}
                  aria-label="Sensores de Movimiento"
                  className="
                    group relative block w-full overflow-hidden rounded-[28px]
                    bg-white/90 backdrop-blur ring-1 ring-zinc-200
                    shadow-[0_20px_60px_-28px_rgba(2,6,23,.35)]
                    hover:shadow-[0_30px_80px_-30px_rgba(2,6,23,.45)]
                    transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]/30
                  "
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-[#e84e1b]" />
                  <div className="p-6 md:p-8">
                    <h3 className="text-center text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                      Sensores de Movimiento
                    </h3>
                    <div className="relative mt-5 aspect-[16/10] rounded-2xl border border-zinc-200/80 bg-white">
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(70%_70%_at_50%_60%,rgba(232,78,27,0.14),transparent_64%)]" />
                      <img
                        src="https://i.postimg.cc/0QmmJYBP/Screenshot-2025-09-29-at-7-35-35-AM.png"
                        alt="Sensores de movimiento"
                        className="absolute inset-0 h-full w-full object-cover object-center
           transition-transform duration-500 ease-out
           group-hover:scale-[1.05] rounded-2xl"
                      />
                    </div>
                    <div className="mt-6">
                      <div
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e84e1b] px-4 py-3 text-sm font-semibold text-white hover:opacity-95 active:translate-y-px transition"
                        aria-hidden="true"
                      >
                        Ver productos
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13 5l7 7-7 7M5 12h14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/60 mix-blend-overlay" />
                </button>
              </article>
            </div>
          </section>
        )}

        {/* ===================== SUBCATEGORÍAS DE ILUMINACIÓN ===================== */}
        {isLighting && !lightingSub && (
          <section className="mt-6">
            {/* Botón + título centrado */}
            <div className="mb-6 grid grid-cols-[auto,1fr,auto] items-center gap-3 font-heading">
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                ← Volver a Categorías
              </Button>

              <h2 className="text-center text-5xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Nuestros Productos de <span className="text-[#e84e1b]">Iluminación</span>
              </h2>

              <Button variant="outline" className="opacity-0 pointer-events-none select-none">
                ← Volver a Categorías
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {/* Paneles LED */}
              <article>
                <button
                  type="button"
                  onClick={() => setLightingSub('Paneles LED')}
                  aria-label="Paneles LED"
                  className="
                    group relative block w-full overflow-hidden rounded-[28px]
                    bg-white/90 backdrop-blur ring-1 ring-zinc-200
                    shadow-[0_20px_60px_-28px_rgba(2,6,23,.35)]
                    hover:shadow-[0_30px_80px_-30px_rgba(2,6,23,.45)]
                    transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]/30
                  "
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-[#e84e1b]" />
                  <div className="p-6 md:p-8">
                    <h3 className="text-center text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                      Paneles LED
                    </h3>
                    <div className="relative mt-5 aspect-[16/10] rounded-2xl border border-zinc-200/80 bg-white">
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(70%_70%_at_50%_60%,rgba(232,78,27,0.14),transparent_62%)]" />
                      <img
                        src="https://i.postimg.cc/jjRPJnrh/Screenshot-2025-09-29-at-7-49-06-AM.png"
                        alt="Paneles LED"
                        className="absolute inset-0 h-full w-full object-cover object-center
           transition-transform duration-500 ease-out
           group-hover:scale-[1.05] rounded-2xl"
                      />
                    </div>
                    <div className="mt-6">
                      <div
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e84e1b] px-4 py-3 text-sm font-semibold text-white hover:opacity-95 active:translate-y-px transition"
                        aria-hidden="true"
                      >
                        Ver productos
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13 5l7 7-7 7M5 12h14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/60 mix-blend-overlay" />
                </button>
              </article>

              {/* Reflectores */}
              <article>
                <button
                  type="button"
                  onClick={() => setLightingSub('Reflectores')}
                  aria-label="Reflectores"
                  className="
                    group relative block w-full overflow-hidden rounded-[28px]
                    bg-white/90 backdrop-blur ring-1 ring-zinc-200
                    shadow-[0_20px_60px_-28px_rgba(2,6,23,.35)]
                    hover:shadow-[0_30px_80px_-30px_rgba(2,6,23,.45)]
                    transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]/30
                  "
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-[#e84e1b]" />
                  <div className="p-6 md:p-8">
                    <h3 className="text-center text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                      Reflectores
                    </h3>
                    <div className="relative mt-5 aspect-[16/10] rounded-2xl border border-zinc-200/80 bg-white">
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(70%_70%_at_50%_60%,rgba(232,78,27,0.14),transparent_62%)]" />
                      <img
                        src="https://i.postimg.cc/c42NHfw3/Screenshot-2025-09-29-at-7-53-26-AM.png"
                        alt="Reflectores"
                        className="absolute inset-0 h-full w-full object-cover object-center
           transition-transform duration-500 ease-out
           group-hover:scale-[1.05] rounded-2xl"
                      />
                    </div>
                    <div className="mt-6">
                      <div
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e84e1b] px-4 py-3 text-sm font-semibold text-white hover:opacity-95 active:translate-y-px transition"
                        aria-hidden="true"
                      >
                        Ver productos
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13 5l7 7-7 7M5 12h14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/60 mix-blend-overlay" />
                </button>
              </article>
            </div>
          </section>
        )}

        {/* ===================== PRODUCTOS ===================== */}
        {(selectedCategory && (!isSecurity || securitySub) && (!isLighting || lightingSub)) && (
          <section className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-heading">
  <Button variant="ghost" onClick={() => setSelectedCategory(null)}>
    ← Volver a Categorías
  </Button>

  {isSecurity && securitySub && (
    <Button variant="ghost" onClick={() => setSecuritySub(null)}>
      ← Volver a Seguridad
    </Button>
  )}
  {isLighting && lightingSub && (
    <Button variant="ghost" onClick={() => setLightingSub(null)}>
      ← Volver a Iluminación
    </Button>
  )}
</div>


              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {(() => {
              const list = isSecurity
                ? productsOfSecuritySub
                : isLighting
                  ? productsOfLightingSub
                  : productsOfSelected;

              if (list.length === 0) {
                return (
                  <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Sin productos en esta selección</h3>
                    <p className="text-gray-600">Próximamente agregaremos más productos.</p>
                  </div>
                );
              }

              return (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {list.map((product: any) => (
                    <ProductCard key={product.id} product={product} onAddToQuote={handleAddToQuote} />
                  ))}
                </div>
              );
            })()}
          </section>
        )}
      </Container>
    </div>
  );
};

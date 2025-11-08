import React from 'react';
import { ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { useCart } from '../store/CartContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { CatalogDownloadCard } from '../components/catalog/CatalogDownloadCard';
import { Seo } from '../components/Seo';

// Importamos tu detalle (mismo archivo que usás en /product)
import ProductDetail from './Product';

type Category = { id: string; name: string; imageUrl?: string };

const normalize = (s: unknown) =>
  String(s ?? '')
    .normalize('NFD')
    // @ts-expect-error: unicode property escapes
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export const Catalog: React.FC = () => {
  const { addItem } = useCart();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // ===== Categorías únicas
  const categories: Category[] = React.useMemo(() => {
    const seen = new Set<string>();
    return (categoriesData as Category[]).filter((c) => {
      const key = c.name.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  // ===== Carrusel / selección categorías
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const cardRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const productsRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToIndex = (idx: number) => {
    const el = cardRefs.current[idx];
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const selectCategory = (idx: number) => {
    const cat = categories[idx];
    setActiveIndex(idx);
    setSelectedCategory(cat?.name ?? null);
    scrollToIndex(idx);
  };

  const prev = () => selectCategory((activeIndex - 1 + categories.length) % categories.length);
  const next = () => selectCategory((activeIndex + 1) % categories.length);

  // ✅ Siempre arrancar con la primera categoría seleccionada
  React.useEffect(() => {
    if (categories.length && !selectedCategory) {
      setActiveIndex(0);
      setSelectedCategory(categories[0].name);
      setTimeout(() => scrollToIndex(0), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  // ===== Productos filtrados por categoría
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

  // ===== Selección de producto + detalle
  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);
  const selectedProduct = React.useMemo(
    () => productsOfSelected.find((p) => p.id === selectedProductId) ?? productsOfSelected[0],
    [productsOfSelected, selectedProductId]
  );

  React.useEffect(() => {
    if (productsOfSelected.length) {
      setSelectedProductId(productsOfSelected[0].id);
    } else {
      setSelectedProductId(null);
    }
  }, [productsOfSelected]);

  // ===== Agregar a presupuesto desde catálogo (si lo usás en otros lugares)
  const handleAddToQuote = (productId: string) => {
    const product = (productsData as any[]).find((p) => p.id === productId);
    if (!product) return;
    const image = (product.images?.[0] ?? '') as string;
    const sku = product.sku ?? '';
    addItem({ id: product.id, name: product.name, image, sku });
    showToast('¡Producto agregado al presupuesto!', 'success');
  };

  // Scroll a productos desde botón de categoría
  const goToProducts = (idx: number) => {
    selectCategory(idx);
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  // ===== Carrusel de productos
  const prodScrollerRef = React.useRef<HTMLDivElement | null>(null);
  const prodItemWidth = 240;
  const prodGap = 20;

  // Suavizado: desactivar snap durante el scroll programático para evitar "trabas"
  const [progScroll, setProgScroll] = React.useState(false);

  const prodScrollBy = (sign: 1 | -1) => {
    const el = prodScrollerRef.current;
    if (!el) return;

    const itemFull = prodItemWidth + prodGap;
    const current = el.scrollLeft;
    // Avanza/retrocede exactamente 3 tarjetas completas
    const target = Math.max(0, current + sign * itemFull * 3);

    setProgScroll(true);
    el.scrollTo({ left: target, behavior: 'smooth' });

    // Rehabilitar snap cuando termina la animación
    // (valor 360ms acompasa la duración del 'smooth' típico)
    window.clearTimeout((el as any).__snapTimer);
    (el as any).__snapTimer = window.setTimeout(() => setProgScroll(false), 360);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Catálogo de Productos | Geneve"
        description="Explorá el catálogo completo de Geneve: seguridad eléctrica, iluminación, caños, disyuntores, luces de emergencia y más. Asesoramiento técnico y envíos a todo el país."
        pathname="/catalog"
        ogImage="/og/catalog.jpg"
      />

      <Container className="py-8">
        {/* ===== Título arriba del carrusel ===== */}
        <div className="mb-8 text-center font-heading">
          <h1 className="font-extrabold tracking-tight leading-tight text-[clamp(18px,3vw,40px)]">
            Todas Nuestras Categorías
          </h1>
        </div>

        {/* ===== Carrusel de CATEGORÍAS ===== */}
        <div className="relative mb-8">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/10 hover:bg-gray-50 focus:outline-none"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/10 hover:bg-gray-50 focus:outline-none"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-8 overflow-x-auto px-14 py-4 snap-x snap-mandatory items-stretch hide-scrollbar"
          >
            {categories.map((cat, i) => {
              const img =
                cat.imageUrl ??
                'https://images.unsplash.com/photo-1589903619406-a9c9d5f9b2c3?q=80&w=1600&auto=format&fit=crop';
              const active = selectedCategory === cat.name;

              return (
                <button
                  key={cat.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  onClick={() => selectCategory(i)}
                  aria-label={`Ver ${cat.name}`}
                  className={`group relative flex-shrink-0 snap-center transition-all duration-500 ease-out
                    ${active ? 'w-[min(70vw,340px)] scale-105' : 'w-[min(56vw,260px)] scale-[.97] opacity-95'}
                    focus:outline-none
                  `}
                  style={{ flex: '0 0 auto' }}
                >
                  <div
                    className={[
                      'relative overflow-hidden rounded-3xl bg-white',
                      'shadow-[0_16px_50px_-22px_rgba(2,6,23,0.45)]',
                      'transition-all duration-500 ease-out',
                    ].join(' ')}
                  >
                    <div className="relative w-full aspect-[3/4] bg-white">
                      <img
                        src={img}
                        alt={cat.name}
                        loading="lazy"
                        className={`absolute inset-0 h-full w-full object-contain transition-transform duration-500 ease-out
                          ${active ? 'scale-[1.12]' : 'scale-[1.04] group-hover:scale-[1.08]'}
                        `}
                      />

                      {/* Inferior: título + botón alineados a la izquierda (naranja) */}
                      <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                        <h3
                          className={`mb-2 font-extrabold tracking-tight text-[#e84e1b] whitespace-normal break-words ${
                            active ? 'text-[1.35rem]' : 'text-[1.05rem]'
                          }`}
                        >
                          {cat.name}
                        </h3>

                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            goToProducts(i);
                          }}
                          className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold
                                     bg-[#e84e1b] text-white hover:opacity-95 transition active:translate-y-px"
                        >
                          Ver productos
                        </span>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* (Oculto por defecto; siempre hay categoría activa) */}
        {false && !selectedCategory && (
          <div className="mb-8">
            <CatalogDownloadCard />
          </div>
        )}

        {/* ===== Productos de la categoría seleccionada — CARRUSEL EN UNA FILA ===== */}
        {selectedCategory ? (
          <section ref={productsRef} id="products" className="mt-20 ">
            {/* ➕ Título solicitado */}
            <div className="font-heading">
              <h1 className="font-extrabold text-center tracking-tight leading-tight text-[clamp(18px,3vw,36px)]">
                {`Todos los Productos de ${selectedCategory}`}
              </h1>
            </div>

            {/* Mantengo tus toggles por compatibilidad visual */}
            <div className="flex flex-wrap items-center justify-end gap-3">
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

            {productsOfSelected.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sin productos en esta categoría</h3>
                <p className="text-gray-600">Próximamente agregaremos más productos.</p>
              </div>
            ) : (
              <>
                {/* Carrusel de productos */}
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Productos anteriores"
                    onClick={() => prodScrollBy(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/10 hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div
                    ref={prodScrollerRef}
                    className="flex overflow-x-auto gap-5 px-1 md:px-8 py-2 hide-scrollbar"
                    style={{
                      scrollPaddingLeft: '24px',
                      scrollPaddingRight: '24px',
                      scrollSnapType: progScroll ? 'none' : 'x mandatory',
                      scrollBehavior: 'smooth',
                    }}
                  >
                    {productsOfSelected.map((p: any) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onSelect={(prod) => setSelectedProductId(prod.id)}
                        isActive={selectedProduct?.id === p.id}
                        width={240}
                        height={240}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-label="Productos siguientes"
                    onClick={() => prodScrollBy(1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/10 hover:bg-gray-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Detalle embebido usando tu Product.tsx */}
                {selectedProduct ? (
                  <div className="mt-6">
                    <ProductDetail product={selectedProduct} mode="inline" />
                  </div>
                ) : null}
              </>
            )}
          </section>
        ) : null}
      </Container>

    
    </div>
  );
};

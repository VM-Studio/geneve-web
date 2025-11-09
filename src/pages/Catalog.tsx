import React from 'react';
import { ChevronLeft, ChevronRight, Grid, List, Download, X } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { useCart } from '../store/CartContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { CatalogDownloadCard } from '../components/catalog/CatalogDownloadCard';
import { Seo } from '../components/Seo';
import ProductDetail from './Product';

type Category = { id: string; name: string; imageUrl?: string };

const normalize = (s: unknown) =>
  String(s ?? '')
    .normalize('NFD')
    // @ts-expect-error: unicode property escapes
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

// PDFs en /public/catalogo
const CATALOG_PDFS = [
  { label: 'Catálogo completo', file: 'completo.pdf' },
  { label: 'Cajas', file: 'cajas.pdf' },
  { label: 'Caños', file: 'caños.pdf' },
  { label: 'Interruptores', file: 'interruptores.pdf' },
  { label: 'Luces y reflectores', file: 'lucesyreflectores.pdf' },
  { label: 'Serie Conexión', file: 'serieconexion.pdf' },
  { label: 'Sistema modular', file: 'sistemamodular.pdf' },
  { label: 'Tapitas', file: 'tapitas.pdf' },
  { label: 'Trefi', file: 'trefi.pdf' },
] as const;

export const Catalog: React.FC = () => {
  const { addItem } = useCart();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // ===== Modal PDFs
  const [showCatalogs, setShowCatalogs] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowCatalogs(false);
    if (typeof window !== 'undefined') window.addEventListener('keydown', onKey);
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('keydown', onKey);
    };
  }, []);

  // ===== Categorías
  const categories: Category[] = React.useMemo(() => {
    const seen = new Set<string>();
    return (categoriesData as Category[]).filter((c) => {
      const key = c.name.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

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

  React.useEffect(() => {
    if (categories.length && !selectedCategory) {
      setActiveIndex(0);
      setSelectedCategory(categories[0].name);
      setTimeout(() => scrollToIndex(0), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  // ===== Productos
  const productsOfSelected = React.useMemo(() => {
    if (!selectedCategory) return [];
    const sel = normalize(selectedCategory);
    return (productsData as any[])
      .filter((p) => normalize(p.category || '') === sel)
      .sort((a, b) => (a.featured && !b.featured ? -1 : !a.featured && b.featured ? 1 : a.name.localeCompare(b.name)));
  }, [selectedCategory]);

  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);
  const selectedProduct = React.useMemo(
    () => productsOfSelected.find((p) => p.id === selectedProductId) ?? productsOfSelected[0],
    [productsOfSelected, selectedProductId]
  );
  React.useEffect(() => {
    setSelectedProductId(productsOfSelected.length ? productsOfSelected[0].id : null);
  }, [productsOfSelected]);

  const handleAddToQuote = (productId: string) => {
    const product = (productsData as any[]).find((p) => p.id === productId);
    if (!product) return;
    const image = (product.images?.[0] ?? '') as string;
    const sku = product.sku ?? '';
    addItem({ id: product.id, name: product.name, image, sku });
    showToast('¡Producto agregado al presupuesto!', 'success');
  };

  const goToProducts = (idx: number) => {
    selectCategory(idx);
    setTimeout(() => productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  // Carrusel productos
  const prodScrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [progScroll, setProgScroll] = React.useState(false);
  const prodItemWidth = 240;
  const prodGap = 20;
  const prodScrollBy = (sign: 1 | -1) => {
    const el = prodScrollerRef.current;
    if (!el) return;
    const itemFull = prodItemWidth + prodGap;
    const target = Math.max(0, el.scrollLeft + sign * itemFull * 3);
    setProgScroll(true);
    el.scrollTo({ left: target, behavior: 'smooth' });
    window.clearTimeout((el as any).__snapTimer);
    (el as any).__snapTimer = window.setTimeout(() => setProgScroll(false), 360);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Catálogo de Productos | Geneve"
        description="Explorá el catálogo completo de Geneve: seguridad eléctrica, iluminación, caños, disyuntores, luces de emergencia y más."
        pathname="/catalog"
        ogImage="/og/catalog.jpg"
      />

      <Container className="py-8">
        {/* ===== Título ===== */}
        <div className="mb-4 text-center font-heading">
          <h1 className="font-extrabold tracking-tight leading-tight text-[clamp(18px,3vw,40px)]">
            Todas Nuestras Categorías
          </h1>
        </div>

        {/* ===== TARJETA AJUSTADA (alineada con el carrusel) ===== */}
        <div className="mb-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowCatalogs(true)}
            className="group w-[92%] max-w-5xl rounded-3xl bg-white px-6 py-5 text-left 
                       shadow-[0_8px_25px_-5px_rgba(232,78,27,0.35)] ring-1 ring-[#e84e1b]/20 
                       hover:shadow-[0_8px_30px_-5px_rgba(232,78,27,0.45)] transition"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e84e1b]/10">
                <Download className="h-5 w-5 text-[#e84e1b]" />
              </div>
              <div className="flex-1">
                <p className="font-heading text-[clamp(16px,2.2vw,22px)] font-extrabold tracking-tight text-[#111]">
                  Conocé nuestros catálogos completos
                </p>
                <p className="text-sm text-gray-600">
                  Abrí el listado y descargá el PDF que necesites.
                </p>
              </div>
              <span className="rounded-xl bg-[#e84e1b] px-4 py-2 text-sm font-semibold text-white group-hover:opacity-95 transition">
                Ver catálogos
              </span>
            </div>
          </button>
        </div>

        {/* ===== MODAL PDFs ===== */}
        {showCatalogs && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="font-heading text-lg font-extrabold tracking-tight">
                  Descargas — Catálogos en PDF
                </h2>
                <button
                  aria-label="Cerrar"
                  onClick={() => setShowCatalogs(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 py-5">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CATALOG_PDFS.map((p) => {
                    const href = `/catalogo/${encodeURIComponent(p.file)}`;
                    return (
                      <li key={p.file}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener"
                          download
                          className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 hover:border-gray-300 hover:bg-gray-50 transition"
                        >
                          <span className="font-medium text-gray-900">{p.label}</span>
                          <Download className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowCatalogs(false)}
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_16px_50px_-22px_rgba(2,6,23,0.45)] transition-all duration-500 ease-out">
                    <div className="relative w-full aspect-[3/4] bg-white">
                      <img
                        src={img}
                        alt={cat.name}
                        loading="lazy"
                        className={`absolute inset-0 h-full w-full object-contain transition-transform duration-500 ease-out
                          ${active ? 'scale-[1.12]' : 'scale-[1.04] group-hover:scale-[1.08]'}
                        `}
                      />
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
                          className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold bg-[#e84e1b] text-white hover:opacity-95 transition"
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

        {/* ===== Productos de la categoría seleccionada ===== */}
        {selectedCategory ? (
          <section ref={productsRef} id="products" className="mt-20">
            <div className="font-heading">
              <h1 className="font-extrabold text-center tracking-tight leading-tight text-[clamp(18px,3vw,36px)]">
                {`Todos los Productos de ${selectedCategory}`}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <div className="flex items-center space-x-2">
                <Button variant={viewMode === 'grid' ? 'primary' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant={viewMode === 'list' ? 'primary' : 'ghost'} size="sm" onClick={() => setViewMode('list')}>
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

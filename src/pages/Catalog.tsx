import React from 'react';
import { Grid, List } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { useCart } from '../store/CartContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

type Category = { id: string; name: string; imageUrl?: string };

export const Catalog: React.FC = () => {
  const { addItem } = useCart();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

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
    return productsData
      .filter(
        (p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
      )
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [selectedCategory]);

  const handleAddToQuote = (productId: string) => {
    const product = productsData.find((p) => p.id === productId);
    if (!product) return;

    const image = (product.images?.[0] ?? '') as string;
    const sku = product.sku ?? '';

    addItem({
      id: product.id,
      name: product.name,
      image,
      sku,
    });

    showToast('¡Producto agregado al presupuesto!', 'success');
  };

  // Estilos de tarjeta de categoría (similar a tu ejemplo con franja naranja abajo)
  const cardBase: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 10px 24px rgba(0,0,0,0.15)',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="col-start-2 justify-self-center text-center font-extrabold tracking-tight leading-tight
               text-[clamp(20px,4.5vw,44px)]">
            {selectedCategory ? selectedCategory : 'Todas Nuestras Categorias'}
          </h1>
          <p className="text-lg text-gray-600">
            Descubrí nuestro catálogo completo de iluminación, seguridad y construcción.
          </p>
        </div>

        {/* Vista: TARJETAS DE CATEGORÍAS */}
        {/* Vista: TARJETAS DE CATEGORÍAS */}
{!selectedCategory && (
  <section>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <article key={cat.id} className="aspect-[5/4]">
          <button
            type="button"
            onClick={() => setSelectedCategory(cat.name)}
            aria-label={cat.name}
            className="relative block w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]"
            style={{
              ...cardBase,
              backgroundImage: cat.imageUrl
                ? `url("${cat.imageUrl}")`
                : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5"
              style={{ backgroundColor: 'rgba(232, 78, 27, 0.85)' }}
            >
              <h3 className="text-white text-xl lg:text-2xl font-extrabold tracking-wide uppercase whitespace-nowrap">
                {cat.name}
              </h3>
            </div>
          </button>
        </article>
      ))}
    </div>
  </section>
)}

       

        {/* Vista: PRODUCTOS DE LA CATEGORÍA SELECCIONADA */}
        {selectedCategory && (
          <section className="mt-8 space-y-6">
            {/* Acciones */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                ← Volver a Categorías
              </Button>

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

            {/* Productos */}
            {productsOfSelected.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sin productos en esta categoría
                </h3>
                <p className="text-gray-600">
                  Próximamente agregaremos más productos.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {productsOfSelected.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToQuote={handleAddToQuote}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </Container>
    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Badge } from '../components/ui/Badge';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductSpecs } from '../components/product/ProductSpecs';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { useCart } from '../store/CartContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { Seo } from '../components/Seo';

type ProductDetailProps = {
  product?: any;                 // si viene, se usa este producto (modo embebido)
  mode?: 'inline' | 'page';      // 'page' (ruta /product/:slug) o 'inline' (embebido en catálogo)
};

export const Product: React.FC<ProductDetailProps> = ({ product: productProp, mode = 'page' }) => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'downloads'>('description');

  // Para RelatedProducts (se mantiene igual)
  const { addItem } = useCart();

  // Producto fuente: prop (inline) o ruta (page)
  const routeProduct = useMemo(
    () => productsData.find((p: any) => p.slug === slug),
    [slug]
  );
  const product: any = productProp ?? routeProduct;

  useEffect(() => {
    if (mode === 'page') {
      // Scroll a la sección de contenido después de un pequeño delay
      setTimeout(() => {
        const contentSection = document.getElementById('product-content');
        if (contentSection) {
          contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [slug, mode]);

  if (!product) {
    // En modo página, redirige si no existe; en inline no renderiza nada
    return mode === 'page' ? <Navigate to="/catalog" replace /> : null;
  }

  const category =
    categoriesData.find((cat: any) => cat.id === product.category) ??
    categoriesData.find((cat: any) => cat.name === product.category);

  // Tabs visibles según data
  const tabs = [
    { id: 'description', label: 'Descripción', show: true },
    { id: 'specifications', label: 'Especificaciones', show: product.specs && Object.keys(product.specs).length > 0 },
    { id: 'downloads', label: 'Descargas', show: product.downloads && product.downloads.length > 0 },
  ].filter((tab) => tab.show);

  /* ======================= SEO (solo en modo "page") ======================= */
  const pageTitle = `${product.name} | Geneve`;
  const pageDescription =
    product.shortDescription || product.description?.slice(0, 160) || 'Ficha técnica y detalles del producto Geneve.';
  const pathname = `/product/${product.slug}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    image: product.images,
    description: product.description || product.shortDescription || '',
    category: category?.name || product.category || '',
    brand: { '@type': 'Brand', name: 'Geneve' },
    ...(typeof product.stock === 'boolean'
      ? { offers: { '@type': 'Offer', availability: product.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } }
      : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: typeof window !== 'undefined' ? `${window.location.origin}/` : '/' },
      { '@type': 'ListItem', position: 2, name: 'Catálogo', item: typeof window !== 'undefined' ? `${window.location.origin}/catalog` : '/catalog' },
      { '@type': 'ListItem', position: 3, name: product.name, item: typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : pathname },
    ],
  };
  /* ======================================================================= */

  // Handler para "Productos relacionados" (se conserva)
  const handleRelatedProductAdd = (productId: string) => {
    const relatedProduct = (productsData as any[]).find((p) => p.id === productId);
    if (relatedProduct) {
      addItem({
        id: relatedProduct.id,
        name: relatedProduct.name,
        image: relatedProduct.images[0],
        sku: relatedProduct.sku,
      });
      showToast('Producto añadido al presupuesto!', 'success');
    }
  };

  return (
    <div className={mode === 'page' ? 'min-h-screen bg-gray-50' : ''}>
      {/* ✅ Meta para la ficha (solo page) */}
      {mode === 'page' && (
        <>
          <Seo title={pageTitle} description={pageDescription} pathname={pathname} ogImage={product.images?.[0]} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        </>
      )}

      <Container className={mode === 'page' ? 'py-8' : 'pt-0'}>
        {/* Back Button solo en página */}
        {mode === 'page' && (
          <Link to="/catalog" className="mb-8 inline-flex items-center gap-2 font-semibold text-[#e04f01] hover:text-[#e84e1b]">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo</span>
          </Link>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Información */}
          <div>
            <div className="mb-6">
              <h1 id="product-content" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {product.shortDescription && (
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{product.shortDescription}</p>
              )}

              {product.tags?.length ? (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}

              {product.sku && (
                <div className="text-sm text-gray-500 mb-6">
                  SKU: <span className="font-mono font-medium">{product.sku}</span>
                </div>
              )}
            </div>

            {/* 🔥 Se eliminó: bloque de "Agregar al presupuesto" */}
            {/* (no hay controles de cantidad ni botón principal) */}

            {/* Downloads */}
            {product.downloads && product.downloads.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Descargar Manual
                </h3>
                <div className="space-y-2">
                  {product.downloads.map((download: any, index: number) => (
                    <a
                      key={index}
                      href={download.url}
                      download
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all group"
                    >
                      <span className="text-sm font-medium text-gray-900 group-hover:text-[#e84e1b]">
                        {download.label}
                      </span>
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-[#e84e1b]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        {tabs.length > 0 && (
          <div className={mode === 'page' ? 'mt-16' : 'mt-10'}>
            {tabs.length > 1 && (
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`
                        py-3 px-1 border-b-2 font-medium text-sm transition-colors
                        ${activeTab === tab.id ? 'border-[#e84e1b] text-[#e84e1b]' : 'border-transparent text-gray-500 hover:text-gray-700'}
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Producto</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p className="text-lg leading-relaxed">{product.description}</p>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && product.specs && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificaciones Técnicas</h2>
                  <ProductSpecs specs={product.specs} />
                </div>
              )}

              {activeTab === 'downloads' && product.downloads && product.downloads.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Descargas & Documentos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.downloads.map((download: any, index: number) => (
                      <a
                        key={index}
                        href={download.url}
                        download
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#e84e1b] hover:bg-orange-50 transition-all group"
                      >
                        <span className="font-medium text-gray-900 group-hover:text-[#e84e1b]">
                          {download.label}
                        </span>
                        <Download className="w-5 h-5 text-gray-400 group-hover:text-[#e84e1b]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Relacionados (se mantiene) */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
          onAddToQuote={handleRelatedProductAdd}
        />
      </Container>
    </div>
  );
};

// Export default para poder importarlo como <ProductDetail />
export default Product;

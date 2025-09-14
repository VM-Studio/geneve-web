import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Download, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductSpecs } from '../components/product/ProductSpecs';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { useCart } from '../store/CartContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

export const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'downloads'>('description');
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCart();
  
  const product = productsData.find(p => p.slug === slug);
  useEffect(() => {
    // Lleva el scroll a la parte superior al entrar en un producto
    window.scrollTo(0, 0);
  }, [slug]);
  
  
  if (!product) {
    return <Navigate to="/catalog" replace />;
  }

  const category = categoriesData.find(cat => cat.id === product.category);

  const handleAddToQuote = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        image: product.images[0],
        sku: product.sku,
      });
    }
    showToast(`${quantity} item${quantity > 1 ? 's' : ''} added to quote!`, 'success');
    setQuantity(1);
  };

  const handleRelatedProductAdd = (productId: string) => {
    const relatedProduct = productsData.find(p => p.id === productId);
    if (relatedProduct) {
      addItem({
        id: relatedProduct.id,
        name: relatedProduct.name,
        image: relatedProduct.images[0],
        sku: relatedProduct.sku,
      });
      showToast('Product added to quote!', 'success');
    }
  };

  const tabs = [
    { id: 'description', label: 'Description', show: true },
    { id: 'specifications', label: 'Specifications', show: product.specs && Object.keys(product.specs).length > 0 },
    { id: 'downloads', label: 'Downloads', show: product.downloads && product.downloads.length > 0 },
  ].filter(tab => tab.show);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Back Button */}
        <Button
          as={Link}
          to="/catalog"
          variant="ghost"
          className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                {product.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
                {!product.stock && (
                  <Badge variant="error">Out of Stock</Badge>
                )}
                {product.stock && (
                  <Badge variant="success">In Stock</Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {product.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-sm text-gray-500 mb-6">
                SKU: <span className="font-mono font-medium">{product.sku}</span>
              </div>
            </div>

            {/* Add to Quote */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add to Quote</h3>
              
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-16 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToQuote}
                disabled={!product.stock}
                size="lg"
                className="w-full flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {product.stock ? 'Add to Quote' : 'Out of Stock'}
                </span>
              </Button>

              {!product.stock && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Contact us for availability updates
                </p>
              )}
            </div>

            {/* Downloads */}
            {product.downloads && product.downloads.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Downloads
                </h3>
                <div className="space-y-2">
                  {product.downloads.map((download, index) => (
                    <a
                      key={index}
                      href={download.url}
                      download
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all group"
                    >
                      <span className="text-sm font-medium text-gray-900 group-hover:text-orange-600">
                        {download.label}
                      </span>
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Content */}
        <div className="mt-16">
          {/* Tab Navigation */}
          {tabs.length > 1 && (
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      py-3 px-1 border-b-2 font-medium text-sm transition-colors
                      ${activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed">{product.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && product.specs && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                <ProductSpecs specs={product.specs} />
              </div>
            )}

            {activeTab === 'downloads' && product.downloads && product.downloads.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloads & Documentation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.downloads.map((download, index) => (
                    <a
                      key={index}
                      href={download.url}
                      download
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all group"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-orange-600">
                        {download.label}
                      </span>
                      <Download className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
          onAddToQuote={handleRelatedProductAdd}
        />
      </Container>
    </div>
  );
};

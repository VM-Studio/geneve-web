import React from 'react';
import { ProductCard } from './ProductCard';
import productsData from '../../data/products.json';

interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  images: string[];
  tags: string[];
  stock: boolean;
  sku: string;
  featured?: boolean;
}

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  onAddToQuote: (productId: string) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  category,
  onAddToQuote,
}) => {
  const relatedProducts = productsData
    .filter(product => 
      product.category === category && product.id !== currentProductId
    )
    .slice(0, 4) as Product[];

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToQuote={onAddToQuote}
          />
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

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

interface ProductCardProps {
  product: Product;
  onAddToQuote: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToQuote }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group h-full flex flex-col">
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.featured && (
          <Badge
            variant="secondary"
            size="sm"
            className="absolute top-3 left-3"
          >
            Featured
          </Badge>
        )}
        {!product.stock && (
          <Badge
            variant="error"
            size="sm"
            className="absolute top-3 right-3"
          >
            Out of Stock
          </Badge>
        )}

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link
            to={`/product/${product.slug}`}
            className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors mr-2"
            aria-label={`View ${product.name} details`}
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-1">
        {/* Título y descripción (altura flexible) */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight line-clamp-2">
            {product.name}
          </h3>
          {/* Limito a 3 líneas para uniformar alturas */}
          <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Spacer para empujar el footer al fondo */}
        <div className="mt-auto" />

        {/* Footer fijo abajo: SKU + Botón (mismo tamaño en todas) */}
        <div className="flex items-end justify-between pt-4">
          <div className="text-xs text-gray-500 truncate whitespace-nowrap">
            SKU: {product.sku}
          </div>
          <Button
  variant="primary"
  size="sm"
  onClick={() => onAddToQuote(product.id)}
  disabled={!product.stock}
  className="flex items-center justify-center space-x-2 w-44 whitespace-nowrap flex-shrink-0"
>
  <ShoppingCart className="w-4 h-4" />
  <span className="whitespace-nowrap">Pedir Presupuesto</span>
</Button>

        </div>
      </div>
    </div>
  );
};

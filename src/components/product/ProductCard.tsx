import React from 'react';

export interface ProductCardItem {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  category: string;
  images: string[];
  tags?: string[];
  stock?: boolean;
  sku?: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: ProductCardItem;
  onSelect: (product: ProductCardItem) => void; // abre el detalle inline
  isActive?: boolean;                            // resalta el seleccionado
  width?: number;                                // px
  height?: number;                               // px
}

/**
 * Ítem minimalista para CARRUSEL (una fila):
 * - Imagen + nombre + "Ver detalle" (no botón)
 * - TODO el ítem es clickeable
 * - No navega: delega en onSelect para abrir el detalle inline
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isActive = false,
  width = 180,
  height = 180,
}) => {
  const img = product?.images?.[0] ?? '';

  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className="group flex flex-col items-center justify-start text-center flex-shrink-0 snap-center focus:outline-none"
      style={{ width: width + 20 }} // margen visual para el texto
      aria-label={`Ver ${product.name}`}
    >
      {/* Imagen */}
      <div
        className={`relative overflow-hidden rounded-none bg-white transition-all duration-300
                    ${isActive ? 'ring-2 ring-[#e67a5d]' : 'hover:shadow-lg'}`}
        style={{ width, height }}
      >
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Nombre */}
      <h3
        className={`mt-4 font-semibold leading-tight text-gray-900
                    ${isActive ? 'text-[#e67a5d]' : 'group-hover:text-[#e67a5d]'} transition-colors`}
      >
        {product.name}
      </h3>
    </button>
  );
};

export default ProductCard;

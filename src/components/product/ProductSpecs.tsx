import React from 'react';

interface ProductSpecsProps {
  specs: Record<string, string>;
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ specs }) => {
  if (!specs || Object.keys(specs).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No specifications available for this product.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <tbody>
          {Object.entries(specs).map(([key, value], index) => (
            <tr
              key={key}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-gray-100 transition-colors`}
            >
              <td className="py-3 px-4 font-medium text-gray-900 w-1/3">
                {key}
              </td>
              <td className="py-3 px-4 text-gray-700">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
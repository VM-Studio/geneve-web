import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X, Grid, List } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { useCart } from '../store/CartContext';
import { useFilters } from '../store/FiltersContext';
import { showToast } from '../components/ui/Toast';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

// --- helper: id|name -> name ---
const resolveCategoryName = (value?: string | null) => {
  if (!value) return "";
  const v = value.toLowerCase();
  const match = (categoriesData as Array<{id: string; name: string}>).find(
    c => c.id.toLowerCase() === v || c.name.toLowerCase() === v
  );
  return match ? match.name : value; // si no encuentra, devuelve lo recibido
};


export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { filters, setCategory, setSearch, setSort, clearFilters } = useFilters();
  const { addItem } = useCart();

  // Initialize filters from URL params
  React.useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== filters.category) {
      setCategory(resolveCategoryName(categoryParam));
    }
  }, [searchParams, filters.category, setCategory]);
  

  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];

    // Filter by category
if (filters.category) {
  const selectedName = resolveCategoryName(filters.category).toLowerCase();
  filtered = filtered.filter(product =>
    (product.category || "").toLowerCase() === selectedName
  );
}


    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.shortDescription.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'featured':
        default:
          // Featured first, then by name
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [filters]);

  const handleAddToQuote = (productId: string) => {
    const product = productsData.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        image: product.images[0],
        sku: product.sku,
      });
      showToast('Producto añadido al presupuesto!', 'success');
    }
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams({});
  };

  const activeFiltersCount = [filters.category, filters.search].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8 text-center">
  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
    Todos Nuestros Productos
  </h1>
  <p className="text-lg text-gray-600">
  Descubrí nuestro catálogo completo de iluminación, seguridad y construcción.
  </p>
</div>


        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 mt-10">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="lg:hidden"
                >
                  {isFiltersOpen ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                </Button>
              </div>

              <div className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar Productos
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by name, SKU, or tags..."
                      value={filters.search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                      fullWidth
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <Select
  value={resolveCategoryName(filters.category)}
  onChange={(e) => setCategory(e.target.value)}
  fullWidth
>
  <option value="">Todas las Categorías</option>
  {categoriesData.map((category) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ))}
</Select>

                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordenar Por
                  </label>
                  <Select
                    value={filters.sort}
                    onChange={(e) => setSort(e.target.value as 'name' | 'category' | 'featured')}
                    fullWidth
                  >
                    <option value="featured">Destacado Primero</option>
                    <option value="name">Nombre A-Z</option>
                    <option value="category">Categoría</option>
                  </Select>
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="w-full"
                  >
                    Borrar Filtros ({activeFiltersCount})
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                
                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filters.category && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {resolveCategoryName(filters.category)}

                        <button
                          onClick={() => setCategory('')}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {filters.search && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        "{filters.search}"
                        <button
                          onClick={() => setSearch('')}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              {/* View mode toggle – flotante, no afecta la alineación */}
<div className="relative">
  <div className="absolute right-0 -top-12 hidden sm:flex items-center space-x-2">
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
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
                }
              `}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToQuote={handleAddToQuote}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
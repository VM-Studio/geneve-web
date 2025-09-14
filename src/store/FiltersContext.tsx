import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FiltersState {
  category: string;
  search: string;
  sort: 'name' | 'category' | 'featured';
}

interface FiltersContextType {
  filters: FiltersState;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setSort: (sort: 'name' | 'category' | 'featured') => void;
  clearFilters: () => void;
}

const defaultFilters: FiltersState = {
  category: '',
  search: '',
  sort: 'featured',
};

const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('geneve_filters_v1');
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters);
        setFilters({ ...defaultFilters, ...parsedFilters });
      } catch (error) {
        console.error('Failed to load filters from localStorage:', error);
      }
    }
  }, []);

  // Save filters to localStorage when they change
  useEffect(() => {
    localStorage.setItem('geneve_filters_v1', JSON.stringify(filters));
  }, [filters]);

  const setCategory = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const setSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const setSort = (sort: 'name' | 'category' | 'featured') => {
    setFilters(prev => ({ ...prev, sort }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const value: FiltersContextType = {
    filters,
    setCategory,
    setSearch,
    setSort,
    clearFilters,
  };

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
};
import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';

interface ProductFiltersProps {
  onFilterChange: (filters: { categories?: string[] }) => void;
  totalProducts: number;
  currentCategoryId?: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange, totalProducts, currentCategoryId }) => {
  const { categories } = useProductContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const handleCategoryChange = (categoryName: string) => {
    const newCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter(c => c !== categoryName)
      : [...selectedCategories, categoryName];
    
    setSelectedCategories(newCategories);
    
    onFilterChange({
      categories: newCategories
    });
  };
  
  // Show all categories including the current one for filtering
  const availableCategories = categories;
  
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center text-amber-800 hover:text-amber-900 font-medium text-base sm:text-lg py-2"
        >
          <span className="mr-2">Filters</span>
          <span className="text-xl">{isFilterOpen ? '−' : '+'}</span>
        </button>
        <span className="text-amber-600 text-sm sm:text-base">{totalProducts} products</span>
      </div>
      
      {isFilterOpen && (
        <div className="bg-amber-50 p-4 sm:p-6 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Categories */}
            {availableCategories.length > 0 && (
              <div>
                <h4 className="font-medium text-amber-900 mb-3 text-base sm:text-lg">Categories</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {availableCategories.map(category => (
                    <label key={category.name} className="flex items-center cursor-pointer py-1">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => handleCategoryChange(category.name)}
                        className="rounded border-amber-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                      />
                      <span className="ml-3 text-amber-800 text-sm sm:text-base">
                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                        {category.name === currentCategoryId && (
                          <span className="ml-2 text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded">
                            Current
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
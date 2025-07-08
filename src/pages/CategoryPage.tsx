import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import { useProductContext } from '../context/ProductContext';
import { Product } from '../types';
import { getProductImageUrl } from '../utils/imageMapping';
import { slugify } from '../utils/slugify';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categories } = useProductContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  // Find the category data using slugify and trim
  const categoryData = categories.find(cat => 
    slugify(cat.name.trim()) === categoryId?.trim()
  );

  // Map ProductItem[] to Product[] for ProductGrid
  const products: Product[] = useMemo(() => {
    if (!categoryData) return [];

    return categoryData.products.map((item, index) => ({
      id: `${slugify(categoryData.name)}-${index}`,
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      category: categoryData.name,
      categoryId: categoryData.name,
      price: 0, // You'll need to add price data to your JSON
      imageUrl: getProductImageUrl(categoryData.name, index),
      description: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      shortDescription: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      subheading: item.size ? (Array.isArray(item.size) ? item.size.join(', ') : item.size) : '',
      isNewArrival: false,
      isOnSale: false,
      isFeatured: false,
    }));
  }, [categoryData]);

  // Filter products based on selected categories
  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return products;
    }
    return products.filter(product => selectedCategories.includes(product.category));
  }, [products, selectedCategories]);

  const handleFilterChange = (filters: { categories?: string[] }) => {
    setSelectedCategories(filters.categories || []);
  };

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-900 mb-4">Category Not Found</h1>
          <p className="text-amber-700">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="text-center mb-8">
          <h1 className="font-cursive text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-4 font-bold">
            {categoryData.name}
          </h1>
          <p className="text-amber-700 max-w-2xl mx-auto text-sm sm:text-base">
            {categoryData.common || `Explore our beautiful collection of ${categoryData.name.toLowerCase()}`}
          </p>
        </div>

        <ProductFilters
          onFilterChange={handleFilterChange}
          totalProducts={filteredProducts.length}
          currentCategoryId={categoryData.name}
        />

        <ProductGrid products={filteredProducts} />
      </motion.div>
    </div>
  );
};

export default CategoryPage;
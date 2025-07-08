import React from 'react';
import CategoryCard from './CategoryCard';
import { useProductContext } from '../context/ProductContext';
import { Category } from '../types';
import { getCategoryImageUrl } from '../utils/imageMapping';

const FeaturedCategories: React.FC = () => {
  const { categories } = useProductContext();

  // Map CategoryData to Category with correct image URLs, excluding 'featured'
  const mappedCategories: Category[] = categories
    .filter(cat => cat.name.toLowerCase() !== 'featured')
    .map(cat => {
      const imageUrl = getCategoryImageUrl(cat.name);
      return {
        id: cat.name.toLowerCase().replace(/\s+/g, '-'),
        name: cat.name,
        description: cat.common || '',
        imageUrl,
        productCount: cat.products.length,
      };
    });

  return (
    <section className="py-12 sm:py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="font-cursive text-2xl sm:text-3xl md:text-4xl text-amber-900 text-center mb-2 font-bold">
          Explore Our Collections
        </h2>
        <p className="text-amber-700 text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base px-4">
          Discover our carefully curated categories of handcrafted wooden treasures, 
          each with its own unique character and charm.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mappedCategories.map(category => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { getCategoryImageUrl } from '../utils/imageMapping';
import { slugify } from '../utils/slugify';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/products/category/${slugify(category.name)}`}
      className="relative group overflow-hidden rounded-lg shadow-md block"
    >
      <div className="aspect-square sm:aspect-[3/2] md:aspect-[4/3] overflow-hidden">
        <img 
          src={getCategoryImageUrl(category.name)} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex items-end">
        <div className="p-2 sm:p-4 w-full">
          <h3 className="font-serif text-base sm:text-xl md:text-2xl font-bold text-white mb-1">{category.name}</h3>
          <p className="text-amber-100 text-xs sm:text-sm md:text-base mb-2">{category.productCount} products</p>
          
          <div className="inline-block px-2 py-1 sm:px-4 sm:py-2 bg-amber-600 text-white rounded-md transition-transform duration-300 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-xs sm:text-base">
            Browse Collection
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { getProductImageUrl } from '../utils/imageMapping';
import { slugify } from '../utils/slugify';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the correct image URL based on product category and index
  const getImageUrl = (product: Product) => {
    const categoryName = product.categoryId || product.category;
    const productId = product.id;
    
    // Extract index from product ID (format: "category-index")
    const indexMatch = productId.match(/-(\d+)$/);
    const index = indexMatch ? parseInt(indexMatch[1]) : 0;
    
    const imageUrl = getProductImageUrl(categoryName, index);
    if (imageUrl) {
      return imageUrl;
    }
    
    // Fallback to the provided imageUrl if mapping fails
    return product.imageUrl || '';
  };

  // Generate productId using slugify for category and index
  const getProductId = (product: Product) => {
    const categorySlug = slugify(product.category);
    const productId = product.id;
    const indexMatch = productId.match(/-(\d+)$/);
    const index = indexMatch ? parseInt(indexMatch[1]) : 0;
    return `${categorySlug}-${index}`;
  };

  return (
    <div 
      className="group relative bg-white rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={getImageUrl(product)} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>
      
      <div className="p-3 sm:p-4 border-t border-amber-100">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-amber-900 truncate">{product.name}</h3>
          </div>
          <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full ml-2 flex-shrink-0">
            {product.category==='featured' ? 'BestSeller' : product.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm sm:text-base line-clamp-2 mb-3">{product.description}</p>
        
        <Link 
          to={`/product/${getProductId(product)}`}
          className="inline-flex items-center text-amber-700 hover:text-amber-900 font-medium transition-colors text-sm sm:text-base"
        >
          View Details
          <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1 sm:w-4 sm:h-4" />
        </Link>
      </div>
      
      {product.isNewArrival && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-md">
          New
        </div>
      )}
      
      {product.isOnSale && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
          Sale
        </div>
      )}
    </div>
  );
};

export default ProductCard;
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <section className="py-6 sm:py-8">
      {title && (
        <h2 className="font-cursive text-2xl sm:text-3xl md:text-4xl text-amber-900 mb-4 sm:mb-6 font-bold text-center sm:text-left">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
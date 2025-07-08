import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { getProductImageUrl } from '../utils/imageMapping';
import { slugify } from '../utils/slugify';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { categories } = useProductContext();

  // Debug logging
  let categorySlug = '', indexStr = '';
  if (productId) {
    const lastDash = productId.lastIndexOf('-');
    categorySlug = productId.substring(0, lastDash);
    indexStr = productId.substring(lastDash + 1);
  }
  console.log('productId:', productId);
  console.log('categorySlug:', categorySlug);
  console.log('indexStr:', indexStr);
  console.log('Available category slugs:', categories.map(cat => slugify(cat.name.trim())));

  // Find the product by ID using slugify for category
  const product = React.useMemo(() => {
    if (!productId) return null;
    const lastDash = productId.lastIndexOf('-');
    const categorySlug = productId.substring(0, lastDash);
    const indexStr = productId.substring(lastDash + 1);
    const index = parseInt(indexStr);
    const category = categories.find(cat => 
      slugify(cat.name.trim()) === categorySlug
    );
    console.log('Matched category:', category);
    if (!category || !category.products[index]) return null;
    const productItem = category.products[index];
    const imageUrl = getProductImageUrl(category.name, index);
    console.log('Product item:', productItem);
    console.log('Image URL:', imageUrl);
    return {
      id: productId,
      name: productItem.name.charAt(0).toUpperCase() + productItem.name.slice(1),
      category: category.name,
      categoryId: category.name,
      price: 0, // You'll need to add price data to your JSON
      imageUrl,
      description: productItem.name.charAt(0).toUpperCase() + productItem.name.slice(1),
      shortDescription: productItem.name.charAt(0).toUpperCase() + productItem.name.slice(1),
      subheading: productItem.size ? (Array.isArray(productItem.size) ? productItem.size.join(', ') : productItem.size) : '',
      isNewArrival: false,
      isOnSale: false,
      isFeatured: false,
      // Add product-specific data
      size: productItem.size,
      material: productItem.material,
      finish: productItem.finish,
      common: category.common,
    };
  }, [productId, categories]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-amber-900 mb-4">Product Not Found</h2>
        <p className="text-amber-700 mb-8 text-sm sm:text-base">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/"
          className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Helper function to format size display
  const formatSize = (size: string | string[] | undefined) => {
    if (!size) return '';
    if (Array.isArray(size)) {
      return size.map(s => {
        const str = s.toString();
        return str
          .split('*')
          .map(part => part.trim())
          .map(part => part ? part.replace(/(\d+(?:\.\d+)?)/g, '$1"') : '')
          .join('×');
      }).join(', ');
    }
    const str = size.toString();
    return str
      .split('*')
      .map(part => part.trim())
      .map(part => part ? part.replace(/(\d+(?:\.\d+)?)/g, '$1"') : '')
      .join('×');
  };

  // Helper function to capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center text-xs sm:text-sm text-amber-600 flex-wrap">
          <span><Link to="/" className="hover:underline">Home</Link></span>
          <span className="mx-2">/</span>
          <span><Link to={`/products/category/${slugify(product.category.trim())}`} className="hover:underline">
            {product.category}
          </Link></span>
          <span className="mx-2">/</span>
          <span className="text-amber-800 truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Image Full Screen */}
      <div className="w-full bg-white">
        <img 
          src={product.imageUrl}
          alt={product.name}
          className="w-full object-cover max-h-[60vh] bg-amber-50"
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-900 mb-4 text-center">{product.name}</h1>
          {product.size && (
            <div className="mb-2 text-center">
              <span className="font-semibold text-amber-800">Size:</span> {formatSize(product.size)}
            </div>
          )}
          {/* Show any other fields except name, size */}
          {product.material && (
            <div className="mb-2 text-center">
              <span className="font-semibold text-amber-800">Material:</span> {capitalize(product.material)}
            </div>
          )}
          {product.finish && (
            <div className="mb-2 text-center">
              <span className="font-semibold text-amber-800">Finish:</span> {capitalize(product.finish)}
            </div>
          )}
          {/* Common line from commons.json */}
          {product.common && (
            <div className="mt-4 text-center text-amber-700 italic">
              {capitalize(product.common)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
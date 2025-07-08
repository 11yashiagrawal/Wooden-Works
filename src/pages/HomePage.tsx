import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import ProductGrid from '../components/ProductGrid';
import Testimonials from '../components/Testimonials';
import { useProductContext } from '../context/ProductContext';
import { Product } from '../types';
import { getProductImageUrl } from '../utils/imageMapping';
import { slugify } from '../utils/slugify';

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const HomePage: React.FC = () => {
  const { categories } = useProductContext();
  const featuredCategoryRaw = categories.find(cat => cat.name.toLowerCase() === 'featured');

  // Map ProductItem[] to Product[] for ProductGrid
  const featuredProducts: Product[] = featuredCategoryRaw?.products.map((item, index) => ({
    id: `${slugify('featured')}-${index}`,
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    category: 'Featured',
    categoryId: 'featured',
    price: 0, // You'll need to add price data to your JSON
    imageUrl: getProductImageUrl('featured', index),
    description: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    shortDescription: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    subheading: item.size ? (Array.isArray(item.size) ? item.size.join(', ') : item.size) : '',
    isNewArrival: false,
    isOnSale: false,
    isFeatured: true,
  })) || [];

  return (
    <div>
      <Hero />

      {/* Bestsellers Section */}
      {featuredCategoryRaw && (
        <motion.div
        className="py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-16 lg:px-12 bg-amber-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariant}
      >
        <ProductGrid products={featuredProducts} title="Bestsellers" />
      </motion.div>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariant}
      >
        <FeaturedCategories />
      </motion.div>

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariant}
      >
        <Testimonials />
      </motion.div> */}

      <motion.section 
        className="py-12 sm:py-16 bg-amber-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="font-cursive text-2xl sm:text-3xl md:text-4xl text-amber-900 mb-4 font-bold"
            variants={fadeInUpVariant}
          >
            Crafted with Love and Passion
          </motion.h2>
          <motion.p 
            className="text-amber-800 max-w-3xl mx-auto mb-8 text-sm sm:text-base px-4"
            variants={fadeInUpVariant}
          >
            Each of our wooden products is crafted with meticulous attention to detail, 
            celebrating the natural beauty of wood and traditional craftsmanship.
          </motion.p>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            {[
              {
                title: "Premium Quality",
                description: "We use only the finest wood, sourced responsibly to ensure quality and sustainability.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                )
              },
              {
                title: "Handcrafted",
                description: "Each piece is handcrafted by skilled artisans, making every item unique and special.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                )
              },
              {
                title: "Eco-Friendly",
                description: "We're committed to sustainability, using responsibly sourced materials and eco-friendly processes.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                )
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={fadeInUpVariant}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {feature.icon}
                  </svg>
                </motion.div>
                <h3 className="font-cursive text-lg sm:text-xl text-amber-900 mb-2 font-bold">{feature.title}</h3>
                <p className="text-amber-700 text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
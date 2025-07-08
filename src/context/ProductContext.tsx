import React, { createContext, useContext, ReactNode } from 'react';
import dataRaw from '../data.json';
import commonsRaw from '../commons.json';

// Types
export interface ProductItem {
  name: string;
  size: string | string[];
  [key: string]: any;
}

export interface CategoryData {
  name: string;
  products: ProductItem[];
  common?: string;
}

interface ProductContextType {
  categories: CategoryData[];
  getCategoryByName: (name: string) => CategoryData | undefined;
}

const data: Record<string, ProductItem[]> = dataRaw;
const commons: Record<string, { common?: string; base?: string }> = commonsRaw;

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Build categories from data.json and commons.json
  const categories: CategoryData[] = Object.keys(data).map((categoryName) => {
    const products = data[categoryName];
    const common = commons[categoryName]?.common;
    return {
      name: categoryName,
      products,
      ...(common ? { common } : {})
    };
  });

  const getCategoryByName = (name: string) => {
    return categories.find((cat) => cat.name === name);
  };

  const value: ProductContextType = {
    categories,
    getCategoryByName
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
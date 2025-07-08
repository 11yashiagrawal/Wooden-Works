export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  shortDescription: string;
  subheading: string;
  isNewArrival: boolean;
  isOnSale: boolean;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
  groupId?: string;
}

export interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  categories: string[];
  isExpandable: boolean;
}
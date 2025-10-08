export interface Product {
  id: string;
  name: string;
  description?: string;
  origin: string;
  categoryId: string;
  category?: {
    _id: string;
    name: string;
  };
  urlImgs: string[];
  colors: string[];
  sizes: string[];
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
}

export interface ProductFilter {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  inStock?: boolean;
  featured?: boolean;
  search?: string;
  colors?: string[];
  sizes?: string[];
}

export interface ProductSort {
  field: 'name' | 'price' | 'rating' | 'createdAt';
  order: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  images?: string[];
  verified: boolean;
  createdAt: string;
  user: Pick<import('./user').User, 'firstName' | 'lastName' | 'avatar'>;
}

export interface ProductListResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  origin: string;
  categoryId: string;
  urlImgs: string[];
  colors: string[];
  sizes: string[];
  price: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  origin?: string;
  categoryId?: string;
  urlImgs?: string[];
  colors?: string[];
  sizes?: string[];
  price?: number;
}
 
export interface ProductListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  featured?: boolean;
  inStock?: boolean;
  colors?: string[];
  sizes?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}
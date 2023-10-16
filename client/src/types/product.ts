export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  currentPrice: number;
  oldPrice: number;
  createdAt: Date;
  updatedAt: Date;
  productImages: ProductImage[];
  productDetails: ProductDetails[];
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  rating: number;
  ordersCount: number;
  reviewsCount: number;
}

export interface ProductImage {
  id: string;
  imagePath: string;
  productId: string;
}

export interface ProductDetails {
  id: string;
  size: number;
  quantity: number;
  productId: string;
}

export interface ProductCart extends Product {
  selectedDetails: ProductDetails;
  isSelected: boolean;
}

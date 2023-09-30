export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  currentPrice: number;
  oldPrice: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
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
}

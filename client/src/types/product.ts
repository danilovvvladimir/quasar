export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  isVisible: boolean;
  discountPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  imagePath: string;
  productId: string;
}

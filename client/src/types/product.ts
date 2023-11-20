import { Category } from "./category";
import { Review } from "./review";

export interface UploadedFile {
  filename: string;
  originalname: string;
}

export interface CreatingProduct
  extends Omit<
    Product,
    "createdAt" | "updatedAt" | "productImages" | "productDetails"
  > {
  images: File[];
  details: CreatingProductDetails[];
  categoryIds: CategoryOption[];
}

export interface FullProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  currentPrice: number;
  oldPrice: number;
  createdAt: Date;
  updatedAt: Date;
  categories: ProductCategory[];
  productImages: ProductImage[];
  productSizes: ProductDetails[];
  averageRating: number;
  reviewsCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  currentPrice: number;
  oldPrice: number;
  createdAt: Date;
  updatedAt: Date;
  categories: ProductCategory[];
  productImages: ProductImage[];
  productSizes: ProductDetails[];
  reviews: Review[];
}

export interface AdminProduct extends Product {
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

export interface ProductCart extends ProductDetails {
  product: Product;
  isSelected: boolean;
}

export interface ProductWishlist extends FullProduct {
  isSelected: boolean;
}

export interface ProductCreateDTO {
  name: string;
  slug: string;
  description: string;
  currentPrice: number;
  details: Omit<IProductDetail, "id" | "productId">[];
  imagePaths: string[];
  categoryIds: string[];
  oldPrice?: number;
}

export interface IProductDetail {
  id: string;
  size: number;
  quantity: number;
  productId: string;
}

export interface ProductCategory {
  id: string;
  productId: string;
  categoryId: string;
  category: Category;
}

export interface CreatingProductDetails
  extends Omit<IProductDetail, "productId"> {}

export interface CategoryOption {
  label: string;
  value: string;
  id: string;
}

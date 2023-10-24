import { Review } from "./review";

export interface IUploadedFile {
  filename: string;
  originalname: string;
}

export interface ICreatingProduct
  extends Omit<
    Product,
    "createdAt" | "updatedAt" | "productImages" | "productDetails"
  > {
  images: File[];
  details: ICreatingProductDetails[];
  categoryIds: ICategoryOption[];
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
  productImage: ProductImage[];
  productSize: ProductDetails[];
  review: Review[];
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

export interface ProductCart extends Product {
  selectedDetails: ProductDetails;
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

export interface ICreatingProductDetails
  extends Omit<IProductDetail, "productId"> {}

export interface ICategoryOption {
  label: string;
  value: string;
  id: string;
}

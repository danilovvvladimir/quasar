import { FC } from "react";
import "./ProductsList.scss";
import ProductMedium from "../Product/ProductMedium/ProductMedium";

const ProductsList: FC = () => {
  return (
    <div className="product-list">
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
      <ProductMedium />
    </div>
  );
};

export default ProductsList;

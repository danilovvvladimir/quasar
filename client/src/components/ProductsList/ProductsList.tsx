import { FC } from "react";
import styles from "./ProductsList.module.scss";
import Button from "../UI/Button/Button";
import { Product } from "@/types/product";
import ProductMedium from "../ProductMedium/ProductMedium";
import Pagination, { IPagination } from "../Pagination/Pagination";

interface ProductsListProps {
  products: Product[];
  paginationConfig: IPagination;
}

// TODO pagination
const ProductsList: FC<ProductsListProps> = ({
  products,
  paginationConfig,
}) => {
  return (
    <>
      <div className={styles["product-list"]}>
        {products.map((product) => (
          <ProductMedium key={product.id} product={product} />
        ))}
      </div>

      <Pagination {...paginationConfig} />
    </>
  );
};

export default ProductsList;

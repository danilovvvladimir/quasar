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

const ProductsList: FC<ProductsListProps> = ({
  products,
  paginationConfig,
}) => {
  return (
    <>
      {products.length > 0 && (
        <div className={styles["product-list"]}>
          {products.map((product) => (
            <ProductMedium key={product.id} product={product} />
          ))}
        </div>
      )}

      {products.length > 0 ? (
        <Pagination {...paginationConfig} />
      ) : (
        <div className={styles["product-list__empty"]}>
          Ничего не найдено :(
        </div>
      )}
    </>
  );
};

export default ProductsList;

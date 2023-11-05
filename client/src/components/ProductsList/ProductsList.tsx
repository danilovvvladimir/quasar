import { FC } from "react";
import styles from "./ProductsList.module.scss";
import Button from "../UI/Button/Button";
import { Product } from "@/types/product";
import ProductMedium from "../ProductMedium/ProductMedium";

interface ProductsListProps {
  products: Product[];
}

// TODO pagination
const ProductsList: FC<ProductsListProps> = ({ products }) => {
  return (
    <>
      <div className={styles["product-list"]}>
        {products.map((product) => (
          <ProductMedium key={product.id} product={product} />
        ))}
      </div>
      <div className={styles["pagination"]}>
        <Button className={styles["pagination__button"]} isInverted={true}>
          1
        </Button>
        <Button className={styles["pagination__button"]} isInverted={true}>
          2
        </Button>
        <Button className={styles["pagination__button"]} isInverted={true}>
          3
        </Button>
      </div>
    </>
  );
};

export default ProductsList;

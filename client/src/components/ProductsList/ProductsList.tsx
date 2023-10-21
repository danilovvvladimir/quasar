import { FC } from "react";
import "./ProductsList.scss";
import ProductMedium from "../Product/ProductMedium/ProductMedium";
import Button from "../UI/Button/Button";
import { Product } from "@/types/product";

interface ProductsListProps {
  products: Product[];
}

const ProductsList: FC<ProductsListProps> = ({ products }) => {
  return (
    <>
      <div className="product-list">
        {products.map((product) => (
          <ProductMedium key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination">
        <Button className="pagination__button" isInverted={true}>
          1
        </Button>
        <Button className="pagination__button" isInverted={true}>
          2
        </Button>
        <Button className="pagination__button" isInverted={true}>
          3
        </Button>
      </div>
    </>
  );
};

export default ProductsList;

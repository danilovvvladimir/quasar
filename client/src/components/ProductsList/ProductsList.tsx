import { FC } from "react";
import "./ProductsList.scss";
import ProductMedium from "../Product/ProductMedium/ProductMedium";
import Button from "../UI/Button/Button";

const ProductsList: FC = () => {
  console.log("products list");

  return (
    <>
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

import { FC } from "react";
import ExtendedPrice from "../ExtendedPrice/ExtendedPrice";
import { getDiscountPercent } from "@/utils/getDiscountPercent";
import CurrentPrice from "../CurrentPrice/CurrentPrice";
import Button from "../UI/Button/Button";
import { ProductDetails } from "@/types/product";
import styles from "./SingleProductAside.module.scss";

interface SingleProductAsideProps {
  oldPrice: number;
  currentPrice: number;
  handleSendToCart: () => void;
  isDisabled: boolean;
}

const SingleProductAside: FC<SingleProductAsideProps> = ({
  currentPrice,
  oldPrice,
  handleSendToCart,
  isDisabled,
}) => {
  return (
    <div className={styles["single-product__aside-container"]}>
      <div className={styles["single-product__process"]}>
        <div className={styles["single-product__price"]}>
          {oldPrice ? (
            <ExtendedPrice
              currentPrice={currentPrice}
              oldPrice={oldPrice}
              discountPercent={getDiscountPercent(oldPrice, currentPrice)}
            />
          ) : (
            <CurrentPrice currentPrice={currentPrice} />
          )}
        </div>
        <Button
          disabled={isDisabled}
          className={styles["single-product__cart-button"]}
          onClick={handleSendToCart}
        >
          {isDisabled ? "Товар закончился" : "В корзину"}
        </Button>
      </div>
    </div>
  );
};

export default SingleProductAside;

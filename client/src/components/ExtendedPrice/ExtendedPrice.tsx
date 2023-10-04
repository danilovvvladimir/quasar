import { FC } from "react";
import OldPrice from "../OldPrice/OldPrice";
import DiscountBadge from "../DiscountBadge/DiscountBadge";
import CurrentPrice from "../CurrentPrice/CurrentPrice";
import styles from "./ExtendedPrice.module.scss";

interface ExtendedPriceProps {
  currentPrice: number;
  oldPrice: number;
  discountPercent: number;
}

const ExtendedPrice: FC<ExtendedPriceProps> = ({
  currentPrice,
  discountPercent,
  oldPrice,
}) => {
  return (
    <div className={styles["extended-price"]}>
      <CurrentPrice currentPrice={currentPrice} />
      <OldPrice
        className={styles["extended-price__old-price"]}
        oldPrice={oldPrice}
      />
      <DiscountBadge discountPercent={discountPercent} />
    </div>
  );
};

export default ExtendedPrice;

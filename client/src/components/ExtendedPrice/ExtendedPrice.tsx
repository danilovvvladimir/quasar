import { FC } from "react";
import "./ExtendedPrice.scss";
import OldPrice from "../OldPrice/OldPrice";
import DiscountBadge from "../DiscountBadge/DiscountBadge";
import CurrentPrice from "../CurrentPrice/CurrentPrice";

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
    <div className="extended-price">
      <CurrentPrice currentPrice={currentPrice} />
      <OldPrice className="extended-price__old-price" oldPrice={oldPrice} />
      <DiscountBadge discountPercent={discountPercent} />
    </div>
  );
};

export default ExtendedPrice;

import { FC } from "react";
import styles from "./CartAside.module.scss";
import Button from "../UI/Button/Button";
import CurrentPrice from "../CurrentPrice/CurrentPrice";
import Separator from "../Separator/Separator";
import { PAY_CART_MESSAGE } from "@/constants/messages";

interface CartAsideProps {
  totalAmount: number;
  salesAmount: number;
  cartItemsQuantity: number;
  handlePayment: () => void;
}

const CartAside: FC<CartAsideProps> = ({
  salesAmount,
  totalAmount,
  cartItemsQuantity,
  handlePayment,
}) => {
  return (
    <div className={styles["cart-aside"]}>
      <div className={styles["cart-aside__info"]}>
        <div className={styles["cart-aside__count"]}>
          Всего: {cartItemsQuantity}
          <CurrentPrice
            currentPrice={totalAmount}
            className={styles["cart-aside__current-price"]}
          />
          <Separator />
        </div>
        {salesAmount !== 0 && (
          <div className={styles["cart-aside__sales"]}>
            Скидки:
            <CurrentPrice
              currentPrice={-salesAmount}
              className={styles["cart-aside__current-price"]}
            />
            <Separator />
          </div>
        )}
        <div className={styles["cart-aside__total"]}>
          Итого <CurrentPrice currentPrice={totalAmount - salesAmount} />
        </div>
      </div>
      <Button className={styles["cart-aside__button"]} onClick={handlePayment}>
        {PAY_CART_MESSAGE}
      </Button>
    </div>
  );
};

export default CartAside;

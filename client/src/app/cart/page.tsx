import { FC } from "react";
import "./CartPage.scss";
import Button from "@/components/UI/Button/Button";

const CartPage: FC = () => {
  return (
    <section className="cp">
      <h1 className="title cp__title">Корзина</h1>
      <div className="cp__wrapper">
        <div className="cp__info">
          <div className="cp__selection"></div>
          <div className="cp__items">
            {/* cart item */}
            {/* cart item */}
            {/* cart item */}
          </div>
        </div>

        <div className="cp__processing">
          <div className="cp__processing-info">
            <div className="cp__processing-count">Всего:</div>
            <div className="cp__processing-sales">Скидки: </div>
            <div className="cp__processing-total">Итого</div>
          </div>
          <Button>Оплатить</Button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;

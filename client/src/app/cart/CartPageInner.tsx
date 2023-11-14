"use client";

import { FC } from "react";
import styles from "./CartPage.module.scss";
import GoHomeButton from "@/components/GoHomeButton/GoHomeButton";
import CheckBoxWithLabel from "@/components/UI/CheckBoxWithLabel/CheckBoxWithLabel";
import CartItem from "@/components/CartItem/CartItem";
import CartAside from "@/components/CartAside/CartAside";
import useCartPageInner from "@/hooks/useCartPageInner";

export interface CartItem {}

const CartPageInner: FC = () => {
  const {
    isAllSelected,
    handleCheckboxChange,
    selectAll,
    unselectAll,
    cartItems,
    updateData,
    handlePayment,
    totalAmount,
    salesAmount,
    onSelectItem,
  } = useCartPageInner();

  return (
    <>
      <div className={styles["cart__header"]}>
        <GoHomeButton />
        <h1 className="title">Корзина</h1>
      </div>
      <div className={styles["cart__wrapper"]}>
        {cartItems.length > 0 ? (
          <div className={styles["cart__info"]}>
            <div className={styles["cart__selection"]}>
              <CheckBoxWithLabel
                isChecked={isAllSelected}
                handleCheckboxChange={handleCheckboxChange}
                labelText={"Выбрать все"}
                labelClassName={styles["cart__selection-all"]}
                onClick={selectAll}
              />
              <span
                className={styles["cart__selection-clear"]}
                onClick={unselectAll}
              >
                Снять выделение
              </span>
            </div>
            <div className={styles["cart__items"]}>
              {cartItems.map((productCart) => (
                <CartItem
                  key={productCart.id + productCart.id}
                  onSelectItem={onSelectItem}
                  productCart={productCart}
                  updateData={updateData}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles["cart__empty"]}>
            Вы ещё ничего не добавили в корзину :(
          </div>
        )}

        {cartItems.length > 0 && (
          <CartAside
            handlePayment={handlePayment}
            cartItemsQuantity={
              cartItems.filter((item) => item.isSelected === true).length
            }
            totalAmount={totalAmount}
            salesAmount={salesAmount}
          />
        )}
      </div>
    </>
  );
};

export default CartPageInner;

"use client";

import { FC, useEffect, useState } from "react";
import Button from "@/components/UI/Button/Button";
import styles from "./CartPage.module.scss";
import GoHomeButton from "@/components/GoHomeButton/GoHomeButton";
import CheckBoxWithLabel from "@/components/UI/CheckBoxWithLabel/CheckBoxWithLabel";
import { Product, ProductCart } from "@/types/product";
import CartItem from "@/components/CartItem/CartItem";
import CartAside from "@/components/CartAside/CartAside";
import { getTotalAndSalesCartAmount } from "@/utils/getTotalAndSalesCartAmount";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserService from "@/services/user";

const CartPageInner: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userService = new UserService();

  const products: ProductCart[] = [
    {
      id: "1",
      createdAt: new Date(),
      currentPrice: 7900,
      oldPrice: 10000,
      description: "lorem lorem",
      name: " Nike Air Force 1'07 Nike Airffs...",
      slug: "temp-slug",
      updatedAt: new Date(),
      productDetails: [{ id: "1", quantity: 20, size: 43, productId: "1" }],
      productImages: [
        { id: "421", imagePath: "/product-image.jpg", productId: "1" },
      ],
      selectedDetails: { id: "1", quantity: 20, size: 43, productId: "1" },
      isSelected: false,
    },
    {
      id: "2",
      createdAt: new Date(),
      currentPrice: 7900,
      oldPrice: 10000,
      description: "lorem lorem",
      name: " Nike Air Force 1'07 Nike Airffs...",
      slug: "temp-slug",
      updatedAt: new Date(),
      productDetails: [{ id: "1", quantity: 20, size: 43, productId: "2" }],
      productImages: [
        { id: "421", imagePath: "/product-image.jpg", productId: "1" },
      ],
      selectedDetails: { id: "1", quantity: 20, size: 43, productId: "2" },
      isSelected: false,
    },
  ];

  // Ещё при product -> ProductCart добавить количество товара в корзине.
  const [cartItems, setCartItems] = useState<ProductCart[]>(products);

  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const onSelectItem = (id: string) => {
    setCartItems(
      cartItems.map((cartItem) => {
        if (cartItem.id === id) {
          const previousIsSelected = cartItem.isSelected;
          if (previousIsSelected) {
            setIsAllSelected(false);
          }
          return { ...cartItem, isSelected: !previousIsSelected };
        }
        return cartItem;
      }),
    );
  };

  const selectAll = () => {
    setCartItems(
      cartItems.map((cartItem) => ({ ...cartItem, isSelected: true })),
    );
  };

  const unselectAll = () => {
    setCartItems(
      cartItems.map((cartItem) => ({ ...cartItem, isSelected: false })),
    );
    setIsAllSelected(false);
  };

  const handleCheckboxChange = () => {
    setIsAllSelected((isAllSelected) => !isAllSelected);
  };

  const [totalAmount, salesAmount] = getTotalAndSalesCartAmount(
    cartItems.filter((item) => item.isSelected === true),
  );

  const handlePayment = () => {
    // toast запустить
    setCartItems(cartItems.filter((item) => item.isSelected === false));
  };

  const updateData = async () => {
    const products = await userService.getCartItems(user.id);

    const newCartItems = products.map((item) => ({ ...item, ...item.product }));

    console.log("newCartItems", newCartItems);

    setCartItems(newCartItems);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <div className={styles["cart__header"]}>
        <GoHomeButton />
        <h1 className="title">Корзина</h1>
      </div>
      <div className={styles["cart__wrapper"]}>
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
                key={productCart.id + productCart.selectedDetails.id}
                onSelectItem={onSelectItem}
                productCart={productCart}
              />
            ))}
          </div>
        </div>

        <CartAside
          handlePayment={handlePayment}
          cartItemsQuantity={
            cartItems.filter((item) => item.isSelected === true).length
          }
          totalAmount={totalAmount}
          salesAmount={salesAmount}
        />
      </div>
    </>
  );
};

export default CartPageInner;

import OrderService from "@/services/order";
import UserService from "@/services/user";
import { checkAuth } from "@/store/auth/auth.actions";
import { RootState, AppDispatch } from "@/store/store";
import { OrderItemCreateDTO } from "@/types/order";
import { ProductCart } from "@/types/product";
import { getTotalAndSalesCartAmount } from "@/utils/getTotalAndSalesCartAmount";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//todo types
const useCartPageInner = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userService = new UserService();

  const dispatch = useDispatch<AppDispatch>();

  const [cartItems, setCartItems] = useState<ProductCart[]>([]);

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

  const handlePayment = async () => {
    if (!user) {
      return;
    }

    const userService = new UserService();
    const orderService = new OrderService();

    const selectedItems = cartItems.filter((item) => item.isSelected);

    if (selectedItems.length === 0) {
      return;
    }

    const orderItems: OrderItemCreateDTO[] = selectedItems.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        totalPrice: item.product.currentPrice * item.quantity,
        size: item.size,
      };
    });

    orderService.create({ userId: user.id, orderItems });

    const deletedItems = selectedItems.map((item) => {
      return userService.deleteCartItem(item.id);
    });

    await Promise.all(deletedItems);

    updateData();
    dispatch(checkAuth());
  };

  const updateData = async () => {
    if (!user) {
      return;
    }

    const products = await userService.getCartItems(user.id);

    const newCartItems = products.map((item) => ({
      ...item,
      isSelected: false,
    }));

    setCartItems(newCartItems);
  };

  useEffect(() => {
    updateData();
  }, []);

  return {
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
  };
};

export default useCartPageInner;

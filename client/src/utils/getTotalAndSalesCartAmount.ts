import { ProductCart } from "@/types/product";

export const getTotalAndSalesCartAmount = (cartItems: ProductCart[]) => {
  let totalAmount = 0;
  let salesAmount = 0;

  cartItems.forEach((item) => {
    if (item.oldPrice) {
      totalAmount += item.oldPrice;
      salesAmount += item.oldPrice - item.currentPrice;
    } else {
      totalAmount += item.currentPrice;
    }
  });

  return [totalAmount, salesAmount];
};

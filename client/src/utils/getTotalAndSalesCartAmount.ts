import { ProductCart } from "@/types/product";

export const getTotalAndSalesCartAmount = (cartItems: ProductCart[]) => {
  let totalAmount = 0;
  let salesAmount = 0;

  cartItems.forEach((item) => {
    if (+item.product.oldPrice > +item.product.currentPrice) {
      totalAmount += +item.product.oldPrice;
      salesAmount += +item.product.oldPrice - +item.product.currentPrice;
    } else {
      totalAmount += +item.product.currentPrice;
    }
  });

  return [totalAmount, salesAmount];
};

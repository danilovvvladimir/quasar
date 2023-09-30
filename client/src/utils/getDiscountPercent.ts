export const getDiscountPercent = (oldPrice: number, newPrice: number) => {
  return 100 - Math.floor((newPrice / oldPrice) * 100);
};

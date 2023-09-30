export const getDecoratedPrice = (price: number) => {
  const SEPARATE_LENGTH: number = 3;
  const priceString = price.toString();
  const priceParts = [];

  for (let i = priceString.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % SEPARATE_LENGTH === 0) {
      priceParts.unshift(" ");
    }

    priceParts.unshift(priceString[i]);
  }

  return priceParts.join("") + "₽";
};

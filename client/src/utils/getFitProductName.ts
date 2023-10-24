export const getFitProductName = (name: string) => {
  return name.length > 25 ? name.slice(0, 25) + "..." : name;
};

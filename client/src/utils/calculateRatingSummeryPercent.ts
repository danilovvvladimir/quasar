export const calculateRatingSummeryPercent = (
  reviewsLength: number,
  partLength: number,
): number => {
  if (partLength === 0) return 0;

  return (partLength / reviewsLength) * 100;
};

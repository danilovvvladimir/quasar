import { Review } from "@/types/review";

export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return averageRating;
};

import { RatingSummeryMap, Review } from "@/types/review";

export const calculateRatingSummeries = (reviews: Review[]) => {
  const MIN_RATING_VALUE: number = 1;
  const MAX_RATING_VALUE: number = 5;

  const ratingSummaryMap: RatingSummeryMap = new Map();
  for (let i = MIN_RATING_VALUE; i <= MAX_RATING_VALUE; i++) {
    ratingSummaryMap.set(i, 0);
  }

  for (const review of reviews) {
    const { rating } = review;

    ratingSummaryMap.set(rating, ratingSummaryMap.get(rating)! + 1);
  }

  return ratingSummaryMap;
};

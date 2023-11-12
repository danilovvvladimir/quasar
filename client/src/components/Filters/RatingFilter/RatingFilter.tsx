"use client";

import { ChangeEvent, FC } from "react";
import Image from "next/image";
import styles from "./RatingFilter.module.scss";
import classNames from "classnames";

interface RatingFilterProps {
  selectedRating: number;
  setRating: (rating: number) => void;
}
const starImages = [
  "/stars-4.svg",
  "/stars-3.svg",
  "/stars-2.svg",
  "/stars-1.svg",
  "/stars-0.svg",
];

const RatingFilter: FC<RatingFilterProps> = ({ selectedRating, setRating }) => {
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(event.target.value);
    setRating(newRating);
  };

  return (
    <>
      <div className={styles["rating-filter"]}>
        {starImages.map((image, index) => (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={starImages.length - 1 - index}
              checked={selectedRating === starImages.length - 1 - index}
              onChange={handleOptionChange}
            />
            <div
              className={classNames(styles["rating-filter__item"], {
                [styles["rating-filter__item--selected"]]:
                  selectedRating === starImages.length - 1 - index,
              })}
            >
              <Image
                src={image}
                alt={`stars-${starImages.length - 1 - index}`}
                width={96}
                height={16}
              />
              <div className={styles["rating-filter__item-text"]}>и выше</div>
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default RatingFilter;

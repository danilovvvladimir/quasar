"use client";

import { ChangeEvent, FC } from "react";
import Image from "next/image";
import styles from "./RatingFilter.module.scss";
import classNames from "classnames";

interface RatingFilterProps {
  selectedRating: number;
  setRating: (rating: number) => void;
}
// TODO
const RatingFilter: FC<RatingFilterProps> = ({ selectedRating, setRating }) => {
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(event.target.value);

    setRating(newRating);
  };

  return (
    <div className={styles["rating-filter"]}>
      <label>
        <input
          type="radio"
          name="rating"
          value={4}
          checked={selectedRating === 4}
          onChange={handleOptionChange}
        />
        <div
          className={classNames(styles["rating-filter__item"], {
            [styles["rating-filter__item--selected"]]: selectedRating === 4,
          })}
        >
          <Image src="/stars-4.svg" alt="stars-4" width={96} height={16} />
          <div className={styles["rating-filter__item-text"]}>и выше</div>
        </div>
      </label>
      <label>
        <input
          type="radio"
          name="rating"
          value={3}
          checked={selectedRating === 3}
          onChange={handleOptionChange}
        />
        <div
          className={classNames(styles["rating-filter__item"], {
            [styles["rating-filter__item--selected"]]: selectedRating === 3,
          })}
        >
          <Image src="/stars-3.svg" alt="stars-3" width={96} height={16} />
          <div className={styles["rating-filter__item-text"]}>и выше</div>
        </div>
      </label>
      <label>
        <input
          type="radio"
          name="rating"
          value={2}
          checked={selectedRating === 2}
          onChange={handleOptionChange}
        />
        <div
          className={classNames(styles["rating-filter__item"], {
            [styles["rating-filter__item--selected"]]: selectedRating === 2,
          })}
        >
          <Image src="/stars-2.svg" alt="stars-2" width={96} height={16} />
          <div className={styles["rating-filter__item-text"]}>и выше</div>
        </div>
      </label>
      <label>
        <input
          type="radio"
          name="rating"
          value={1}
          checked={selectedRating === 1}
          onChange={handleOptionChange}
        />
        <div
          className={classNames(styles["rating-filter__item"], {
            [styles["rating-filter__item--selected"]]: selectedRating === 1,
          })}
        >
          <Image src="/stars-1.svg" alt="stars-1" width={96} height={16} />
          <div className={styles["rating-filter__item-text"]}>и выше</div>
        </div>
      </label>
    </div>
  );
};

export default RatingFilter;

"use client";

import { ChangeEvent, FC, useState } from "react";
import "./RatingFilter.scss";
import Image from "next/image";

const RatingFilter: FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("stars-1");

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="rating-filter">
      <label>
        <input
          type="radio"
          name="rating"
          value="stars-4"
          checked={selectedOption === "stars-4"}
          onChange={handleOptionChange}
        />
        <div
          className={
            selectedOption === "stars-4"
              ? "rating-filter__item rating-filter__item--selected"
              : "rating-filter__item"
          }
        >
          <Image src="/stars-4.svg" alt="start-4" width={96} height={16} />
          <div className="rating-filter__item-text">и выше</div>
        </div>
      </label>
      <label>
        <input
          type="radio"
          name="rating"
          value="stars-3"
          checked={selectedOption === "stars-3"}
          onChange={handleOptionChange}
        />
        <div
          className={
            selectedOption === "stars-3"
              ? "rating-filter__item rating-filter__item--selected"
              : "rating-filter__item"
          }
        >
          <Image src="/stars-3.svg" alt="start-3" width={96} height={16} />
          <div className="rating-filter__item-text">и выше</div>
        </div>
      </label>
      <label>
        <input
          type="radio"
          name="rating"
          value="stars-2"
          checked={selectedOption === "stars-2"}
          onChange={handleOptionChange}
        />
        <div
          className={
            selectedOption === "stars-2"
              ? "rating-filter__item rating-filter__item--selected"
              : "rating-filter__item"
          }
        >
          <Image src="/stars-2.svg" alt="start-2" width={96} height={16} />
          <div className="rating-filter__item-text">и выше</div>
        </div>
      </label>
      <label>
        <input
          type="radio"
          name="rating"
          value="stars-1"
          checked={selectedOption === "stars-1"}
          onChange={handleOptionChange}
        />
        <div
          className={
            selectedOption === "stars-1"
              ? "rating-filter__item rating-filter__item--selected"
              : "rating-filter__item"
          }
        >
          <Image src="/stars-1.svg" alt="start-1" width={96} height={16} />
          <div className="rating-filter__item-text">и выше</div>
        </div>
      </label>
    </div>
  );
};

export default RatingFilter;

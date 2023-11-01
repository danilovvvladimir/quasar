"use client";

import { FC } from "react";
import styles from "./SizeList.module.scss";
import { ProductDetails } from "@/types/product";
import classNames from "classnames";

interface SizeListProps {
  productDetails: ProductDetails[];
  showExtraInfo?: boolean;
  selectedDetails: ProductDetails | null;
  handleSelectDetails: (productDetails: ProductDetails) => void;
}

const SizeList: FC<SizeListProps> = ({
  productDetails,
  handleSelectDetails,
  selectedDetails,
  showExtraInfo = true,
}) => {
  return (
    <div className={styles["sizes"]}>
      <ul className={styles["sizes__list"]}>
        {productDetails.map((productDetails) => (
          <li
            onClick={() => handleSelectDetails(productDetails)}
            key={productDetails.id}
            className={classNames(styles["sizes__list-item"], {
              [styles["sizes__list-item--selected"]]:
                productDetails.id === selectedDetails?.id,
            })}
          >
            {productDetails.size}
          </li>
        ))}
      </ul>
      {showExtraInfo && selectedDetails !== null && (
        <div className={styles["sizes__info"]}>
          Осталось на складе: {selectedDetails.quantity}
        </div>
      )}
    </div>
  );
};

export default SizeList;

"use client";

import { FC, useState } from "react";
import "./SizeList.scss";
import { ProductDetails } from "@/types/product";

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
    <div className="sizes">
      <ul className="sizes__list">
        {productDetails.map((productDetails) => (
          <li
            onClick={() => handleSelectDetails(productDetails)}
            key={productDetails.id}
            className={`sizes__list-item ${
              productDetails.id === selectedDetails?.id
                ? "sizes__list-item--selected"
                : ""
            }`}
          >
            {productDetails.size}
          </li>
        ))}
      </ul>
      {showExtraInfo && selectedDetails !== null && (
        <div className="sizes__info">
          Осталось на складе: {selectedDetails.quantity}
        </div>
      )}
    </div>
  );
};

export default SizeList;

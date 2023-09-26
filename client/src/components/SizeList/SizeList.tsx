"use client";

import { FC, useState } from "react";
import "./SizeList.scss";
import { ProductDetails } from "@/types/product";

interface SizeListProps {
  productDetails: ProductDetails[];
}

const SizeList: FC<SizeListProps> = ({ productDetails }) => {
  const [selectedDetails, setSelectedDetails] = useState<ProductDetails | null>(
    null,
  );

  return (
    <div className="sizes">
      <ul className="sizes__list">
        {productDetails.map((pd) => (
          <li
            onClick={() => setSelectedDetails(pd)}
            key={pd.id}
            className={`sizes__list-item ${
              selectedDetails?.id === pd.id ? "sizes__list-item--selected" : ""
            }`}
          >
            {pd.size}
          </li>
        ))}
      </ul>
      {selectedDetails !== null && (
        <div className="sizes__info">
          Осталось на складе: {selectedDetails.quantity}
        </div>
      )}
    </div>
  );
};

export default SizeList;

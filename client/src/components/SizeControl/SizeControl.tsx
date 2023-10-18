"use client";

import { FC } from "react";
import styles from "./SizeControl.module.scss";
import { ICreatingProductDetails } from "@/types/product";

interface SizeControlProps {
  detail: ICreatingProductDetails;
  onChangeDetail: (updatedDetail: ICreatingProductDetails) => void;
}

const SizeControl: FC<SizeControlProps> = ({ detail, onChangeDetail }) => {
  return (
    <div className={styles["size-control"]}>
      <input
        className={styles["size-control__size"]}
        value={detail.size}
        type="number"
        onChange={(e) => onChangeDetail({ ...detail, size: +e.target.value })}
      />
      <input
        className={styles["size-control__quantity"]}
        value={detail.quantity}
        type="number"
        onChange={(e) =>
          onChangeDetail({ ...detail, quantity: +e.target.value })
        }
      />
    </div>
  );
};

export default SizeControl;

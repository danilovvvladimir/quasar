"use client";

import { ChangeEventHandler, FC } from "react";
import styles from "./SizeCreation.module.scss";
import SizeControl from "../SizeControl/SizeControl";
import Button from "../UI/Button/Button";
import useSizeCreation from "@/hooks/useSizeCreation";

interface SizeCreationProps {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SizeCreation: FC<SizeCreationProps> = ({ name, onChange }) => {
  const { productDetails, onChangeDetail, clearDetails, createDetail } =
    useSizeCreation({ name, onChange });
  console.log("productDetails", productDetails);

  return (
    <div className={styles["size-creation"]}>
      <div className={styles["size-creation__items"]}>
        {productDetails.map((detail) => (
          <SizeControl
            key={detail.id}
            detail={detail}
            onChangeDetail={onChangeDetail}
          />
        ))}
      </div>

      <div className={styles["size-creation__actions"]}>
        <Button type="button" onClick={() => createDetail(1, 1)}>
          +
        </Button>
        <Button type="button" onClick={clearDetails}>
          x
        </Button>
      </div>
    </div>
  );
};

export default SizeCreation;

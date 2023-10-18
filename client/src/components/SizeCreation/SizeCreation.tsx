"use client";

import { ChangeEventHandler, FC, useState } from "react";
import styles from "./SizeCreation.module.scss";
import SizeControl from "../SizeControl/SizeControl";
import Button from "../UI/Button/Button";
import getIconByName from "@/utils/getIconByName";
import { ICreatingProductDetails, IProductDetail } from "@/types/product";
import { v4 as uuidv4 } from "uuid";

interface SizeCreationProps {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SizeCreation: FC<SizeCreationProps> = ({ name, onChange }) => {
  const [productDetails, setProductDetails] = useState<
    ICreatingProductDetails[]
  >([]);

  const createDetail = (size: number, quantity: number) => {
    if (productDetails.find((detail) => detail.size === size)) {
      return;
    }

    const newProductDetails: ICreatingProductDetails = {
      quantity,
      size,
      id: uuidv4(),
    };
    setProductDetails([...productDetails, newProductDetails]);
  };

  const clearDetails = () => {
    setProductDetails([]);
    onChange({ target: { name, value: [] } });
  };

  const onChangeDetail = (updatedDetail: ICreatingProductDetails) => {
    setProductDetails([
      ...productDetails.filter((item) => item.id !== updatedDetail.id),
      updatedDetail,
    ]);

    onChange({ target: { name, value: productDetails } });
  };

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

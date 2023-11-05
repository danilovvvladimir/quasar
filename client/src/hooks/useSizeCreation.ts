import { ICreatingProductDetails } from "@/types/product";
import { ChangeEventHandler, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useSizeCreation = ({
  name,
  onChange,
}: {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
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

  return { productDetails, onChangeDetail, clearDetails, createDetail };
};

export default useSizeCreation;

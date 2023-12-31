import { CreatingProductDetails } from "@/types/product";
import { ChangeEventHandler } from "react";
import { v4 as uuidv4 } from "uuid";

const useSizeCreation = ({
  name,
  onChange,
  productDetails,
  setProductDetails,
}: {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  productDetails: CreatingProductDetails[];
  setProductDetails: (details: CreatingProductDetails[]) => void;
}) => {
  // const [productDetails, setProductDetails] = useState<
  //   ICreatingProductDetails[]
  // >([]);

  const createDetail = (size: number, quantity: number) => {
    if (productDetails.find((detail) => detail.size === size)) {
      return;
    }

    const newProductDetails: CreatingProductDetails = {
      quantity,
      size,
      id: uuidv4(),
    };
    setProductDetails([...productDetails, newProductDetails]);
  };

  const clearDetails = () => {
    setProductDetails([]);
    // @ts-ignore
    onChange({ target: { name, value: [] } });
  };

  const onChangeDetail = (updatedDetail: CreatingProductDetails) => {
    // @ts-ignore
    setProductDetails((prevDetails) => {
      const updatedDetails = [
        // @ts-ignore
        ...prevDetails.filter((item) => item.id !== updatedDetail.id),
        updatedDetail,
      ];
      // @ts-ignore
      onChange({ target: { name, value: updatedDetails } });

      return updatedDetails;
    });
  };

  return { productDetails, onChangeDetail, clearDetails, createDetail };
};

export default useSizeCreation;

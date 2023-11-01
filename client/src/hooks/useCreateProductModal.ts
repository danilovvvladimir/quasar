import {
  PRODUCT_CREATE_NOTIFY_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
} from "@/constants/messages";
import ProductService from "@/services/product";
import { ICreatingProduct } from "@/types/product";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { createSlug } from "@/utils/createSlug";
import { useForm, SubmitHandler } from "react-hook-form";

const useCreateProductModal = (updateData: () => void) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ICreatingProduct>({ mode: "onChange" });

  const uploadImage = async (image: File) => {
    return await productService.uploadImage(image);
  };

  const productService = new ProductService();

  const onSubmit: SubmitHandler<ICreatingProduct> = async (values) => {
    try {
      const responses: string[] = [];

      for (let i = 0; i < values.images.length; i++) {
        const uploadedImage = await uploadImage(values.images[i]);
        responses.push(uploadedImage.filename);
      }

      await productService.create({
        name: values.name,
        currentPrice: +values.currentPrice,
        description: values.description,
        imagePaths: responses,
        slug: values.slug,
        details: values.details.map((item) => ({
          quantity: item.quantity,
          size: item.size,
        })),
        categoryIds: values.categoryIds.map((item) => item.id),
        oldPrice: +values.oldPrice,
      });

      updateData();
      createNotify(PRODUCT_CREATE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
      reset();
      resetCustomControllers();
    } catch (error) {
      console.log(error);

      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
    }
  };

  const resetCustomControllers = (): void => {
    setValue("productImage", []);
    setValue("categoryIds", []);
    setValue("productSize", []);
  };

  const handleCreateSlug = (rawString: string) => {
    const slug = createSlug(rawString);

    setValue("slug", slug);
  };

  return {
    register,
    handleSubmit,
    getValues,
    onSubmit,
    handleCreateSlug,
    errors,
    control,
  };
};

export default useCreateProductModal;
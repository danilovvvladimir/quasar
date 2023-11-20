import {
  PRODUCT_CREATE_NOTIFY_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
} from "@/constants/messages";
import ProductService from "@/services/product";
import {
  CategoryOption,
  CreatingProductDetails,
  CreatingProduct,
  Product,
} from "@/types/product";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { createSlug } from "@/utils/createSlug";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { FileWithPreview } from "./useDropzone";
import axios from "axios";

const useCreateProductModal = (updateData: () => void, product?: Product) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreatingProduct>({
    mode: "onChange",
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      currentPrice: product?.currentPrice || 0,
      oldPrice: product?.oldPrice || 0,
    },
  });

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<CategoryOption[]>([]);
  const [productDetails, setProductDetails] = useState<
    CreatingProductDetails[]
  >([]);

  const uploadImage = async (image: File) => {
    return await productService.uploadImage(image);
  };

  const productService = new ProductService();

  const onSubmit: SubmitHandler<CreatingProduct> = async (values) => {
    try {
      const responses: string[] = [];

      for (let i = 0; i < values.images.length; i++) {
        const uploadedImage = await uploadImage(values.images[i]);
        responses.push(uploadedImage.filename);
      }

      if (product) {
        await productService.update(product.id, {
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
      } else {
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
      }

      updateData();
      createNotify(PRODUCT_CREATE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
      reset();
      resetCustomControllers();
    } catch (error) {
      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
    }
  };

  const resetCustomControllers = (): void => {
    setFiles([]);
    setProductDetails([]);
    setSelectedOptions([]);
  };

  const handleCreateSlug = (rawString: string) => {
    const slug = createSlug(rawString);

    setValue("slug", slug);
  };

  const createFileObject = async (
    filePath: string,
  ): Promise<FileWithPreview> => {
    const response = await fetch(filePath);
    const fileData = await response.blob();

    const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
    const file = new File([fileData], fileName, { type: fileData.type });

    const fileWithPreview = Object.assign(file, { preview: filePath });

    return fileWithPreview;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (product) {
        const categoryOptions = product.categories.map((category) => ({
          id: category.category.id,
          label: category.category.name,
          value: category.category.name,
        }));

        const newFiles = await Promise.all(
          product.productImages.map((item) =>
            createFileObject("/" + item.imagePath),
          ),
        );

        setSelectedOptions(categoryOptions);
        setValue("categoryIds", categoryOptions);

        setProductDetails(product.productSizes);
        setValue("details", product.productSizes);

        setFiles(newFiles);
        setValue("images", newFiles);
      }
    };

    fetchData();
  }, [product]);

  return {
    register,
    handleSubmit,
    getValues,
    onSubmit,
    handleCreateSlug,
    errors,
    control,
    files,
    setFiles,
    productDetails,
    setProductDetails,
    selectedOptions,
    setSelectedOptions,
  };
};

export default useCreateProductModal;

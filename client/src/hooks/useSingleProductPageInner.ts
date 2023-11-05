import {
  ADD_TO_CART_MESSAGE,
  ALREADY_HAS_PRODUCT_CART_NOTIFY_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
  SIZE_NOT_SELECTED_MESSAGE,
} from "@/constants/messages";
import ReviewService from "@/services/review";
import UserService from "@/services/user";
import { checkAuth } from "@/store/auth/auth.actions";
import { AppDispatch, RootState } from "@/store/store";
import { Product, ProductDetails } from "@/types/product";
import { Review } from "@/types/review";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSingleProductPageInner = (product: Product) => {
  console.log("product", product);

  const [userHasProduct, setUserHasProduct] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const userService = new UserService();
  const reviewService = new ReviewService();

  const [selectedImage, setSelectedImage] = useState<string>(
    product.productImages[0].imagePath,
  );

  const [selectedDetails, setSelectedDetails] = useState<ProductDetails | null>(
    null,
  );

  const handleSelectDetails = (newSelectedDetails: ProductDetails) => {
    if (newSelectedDetails.id === selectedDetails?.id) {
      setSelectedDetails(null);
    } else {
      setSelectedDetails(newSelectedDetails);
    }
  };

  const userHasSameProductSize = () => {
    if (!user) {
      return false;
    }

    const userHasProduct = user.cartItems.find(
      (item) => item.productId === product.id,
    );

    if (userHasProduct && userHasProduct.size === selectedDetails?.size) {
      createNotify(ALREADY_HAS_PRODUCT_CART_NOTIFY_MESSAGE, notifyMode.ERROR);
      return true;
    }

    return false;
  };

  const handleSendToCart = async () => {
    if (!user) {
      return;
    }

    if (selectedDetails === null) {
      createNotify(SIZE_NOT_SELECTED_MESSAGE, notifyMode.ERROR);
      return;
    }

    try {
      await userService.createCartItem({
        productId: product.id,
        quantity: 1,
        size: selectedDetails.size,
        userId: user.id,
      });

      setSelectedDetails(null);

      dispatch(checkAuth());
      createNotify(ADD_TO_CART_MESSAGE, notifyMode.SUCCESS);
    } catch (error) {
      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      const data = await reviewService.getByProductId(product.id);

      setReviews(data);
    };

    if (
      user &&
      user.orders.find((item) =>
        item.orderItems.find((oi) => oi.productId === product.id),
      )
    ) {
      setUserHasProduct(true);
    } else {
      setUserHasProduct(false);
    }

    getReviews();
  }, []);

  return {
    selectedImage,
    setSelectedImage,
    handleSelectDetails,
    selectedDetails,
    userHasSameProductSize,
    handleSendToCart,
    reviews,
    isModalVisible,
    setIsModalVisible,
    userHasProduct,
  };
};

export default useSingleProductPageInner;

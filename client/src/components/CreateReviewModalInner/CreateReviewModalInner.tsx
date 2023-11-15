import { FC } from "react";
import styles from "./CreateReviewModalInner.module.scss";
import { IReviewCreateFields } from "@/types/common";
import { RootState } from "@/store/store";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import Button from "../UI/Button/Button";
import ReviewService from "@/services/review";
import classNames from "classnames";
import {
  REVIEW_CREATE_NOTIFY_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
  REVIEW_DESCRIPTION_PLACEHOLDER_MESSAGE,
  RATING_PLACEHOLDER_MESSAGE,
  REVIEW_UPDATE_NOTIFY_MESSAGE,
  REVIEW_DELETE_NOTIFY_MESSAGE,
} from "@/constants/messages";
import {
  RATING_REQUIRED_MESSAGE,
  MIN_RATING,
  MIN_RATING_MESSAGE,
  MAX_RATING,
  MAX_RATING_MESSAGE,
} from "@/constants/validation";
import { Review } from "@/types/review";

interface CreateReviewModalInnerProps {
  productId: string; // не правильно, что он знает об этом, надо на callback заменить
  closeModal: () => void;
  review?: Review;
}

const CreateReviewModalInner: FC<CreateReviewModalInnerProps> = ({
  productId,
  review,
  closeModal,
}) => {
  const reviewService = new ReviewService();
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewCreateFields>({
    mode: "onChange",
    defaultValues: {
      rating: review ? review.rating : 1,
      text: review ? review.text : "",
    },
  });

  const onSubmit: SubmitHandler<IReviewCreateFields> = async (values) => {
    try {
      if (!user) {
        return;
      }

      if (!review) {
        await reviewService.create({
          rating: +values.rating,
          text: values.text,
          productId: productId,
          userId: user.id,
        });
        createNotify(REVIEW_CREATE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
      } else {
        await reviewService.update(
          {
            text: values.text,
            rating: +values.rating,
          },
          review.id,
        );

        createNotify(REVIEW_UPDATE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
      }

      reset();
      closeModal();
    } catch (error) {
      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
    }
  };

  const onDeleteReview = async (id: string) => {
    try {
      await reviewService.delete(id);
      createNotify(REVIEW_DELETE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
    } catch (error) {
      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["crmi-form"]}>
      <div className={styles["crmi__fields"]}>
        <label className={styles["crmi__label"]}>
          <span>Описание</span>
          <textarea
            {...register("text")}
            className={classNames("textarea", styles["crmi__textarea"])}
            placeholder={REVIEW_DESCRIPTION_PLACEHOLDER_MESSAGE}
          />
        </label>
        <label className={styles["crmi__label"]}>
          <span>Оценка</span>
          <input
            {...register("rating", {
              required: {
                value: true,
                message: RATING_REQUIRED_MESSAGE,
              },
              min: {
                value: MIN_RATING,
                message: MIN_RATING_MESSAGE,
              },
              max: {
                value: MAX_RATING,
                message: MAX_RATING_MESSAGE,
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Введите целое число",
              },
            })}
            type="number"
            className={classNames("input", styles["crmi__input"])}
            placeholder={RATING_PLACEHOLDER_MESSAGE}
          />

          {errors.rating && (
            <ErrorValidationText text={errors.rating.message!} />
          )}
        </label>
      </div>
      <div className={styles["crmi__controls"]}>
        <Button>Создать</Button>
        {review && (
          <Button type="button" onClick={() => onDeleteReview(review.id)}>
            Удалить
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreateReviewModalInner;

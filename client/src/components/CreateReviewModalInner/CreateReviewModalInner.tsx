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
  CREATE_MESSAGE,
  DESCRIPTION_LABEL_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
  MAX_RATING,
  MAX_RATING_MESSAGE,
  MIN_RATING,
  MIN_RATING_MESSAGE,
  RATING_LABEL_MESSAGE,
  RATING_PLACEHOLDER_MESSAGE,
  RATING_REQUIRED_MESSAGE,
  REVIEW_CREATE_NOTIFY_MESSAGE,
  REVIEW_DESCRIPTION_PLACEHOLDER_MESSAGE,
} from "@/constants/messages";

interface CreateReviewModalInnerProps {
  productId: string; // не правильно, что он знает об этом, надо на callback заменить
}

const CreateReviewModalInner: FC<CreateReviewModalInnerProps> = ({
  productId,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewCreateFields>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IReviewCreateFields> = async (values) => {
    try {
      const reviewService = new ReviewService();
      await reviewService.create({
        rating: +values.rating,
        text: values.text,
        productId: productId,
        userId: user.id,
      });

      reset();
      createNotify(REVIEW_CREATE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
    } catch (error) {
      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["crmi-form"]}>
      <div className={styles["crmi__fields"]}>
        <label className={styles["crmi__label"]}>
          <span>{DESCRIPTION_LABEL_MESSAGE}</span>
          <textarea
            {...register("text")}
            className={classNames("textarea", styles["crmi__textarea"])}
            placeholder={REVIEW_DESCRIPTION_PLACEHOLDER_MESSAGE}
          />
        </label>
        <label className={styles["crmi__label"]}>
          <span>{RATING_LABEL_MESSAGE}</span>
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
        <Button>{CREATE_MESSAGE}</Button>
      </div>
    </form>
  );
};

export default CreateReviewModalInner;

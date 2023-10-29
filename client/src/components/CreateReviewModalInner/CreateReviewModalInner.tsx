import { FC } from "react";
import styles from "./CreateReviewModalInner.module.scss";
import { IReviewCreateFields, IReviewRequest } from "@/types/common";
import { emailRegex } from "@/constants/regex";
import { loginUser } from "@/store/auth/auth.actions";
import { checkIsAuth } from "@/store/auth/auth.slice";
import { AppDispatch, RootState } from "@/store/store";
import { createNotify, notifyMode } from "@/utils/createNotify";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import CustomLink from "../CustomLink/CustomLink";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import Button from "../UI/Button/Button";
import ReviewService from "@/services/review";
import classNames from "classnames";

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
      createNotify("Вы успешно оставили отзыв!");
    } catch (error) {
      createNotify("Something went wrong...", notifyMode.ERROR);
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
            placeholder="Описание отзыва..."
          />
        </label>
        <label className={styles["crmi__label"]}>
          <span>Оценка</span>
          <input
            {...register("rating", {
              required: {
                value: true,
                message: "Оценка обязательна к заполнению в отзыве",
              },
              min: {
                value: 1,
                message: "Рейтинг не может быть ниже 1",
              },
              max: {
                value: 5,
                message: "Рейтинг не может быть больше 5",
              },
            })}
            type="number"
            className={classNames("input", styles["crmi__input"])}
            placeholder="Rating..."
          />

          {errors.rating && (
            <ErrorValidationText text={errors.rating.message!} />
          )}
        </label>
      </div>
      <div className={styles["crmi__controls"]}>
        <Button>Создать</Button>
      </div>
    </form>
  );
};

export default CreateReviewModalInner;

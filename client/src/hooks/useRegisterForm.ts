import {
  ERROR_NOTIFY_MESSAGE,
  REGISTER_SUCCESS_NOTIFY_MESSAGE,
} from "@/constants/messages";
import { registerUser } from "@/store/auth/auth.actions";
import { checkIsAuth } from "@/store/auth/auth.slice";
import { AppDispatch } from "@/store/store";
import { IRegisterRequest } from "@/types/common";
import { createNotify, notifyMode } from "@/utils/createNotify";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const useRegisterForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterRequest>({ mode: "onChange" });

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IRegisterRequest> = async (values) => {
    try {
      const response = await dispatch(registerUser(values));

      if (registerUser.rejected.match(response)) {
        if (axios.isAxiosError(response.payload)) {
          createNotify(
            response.payload.response?.data?.message,
            notifyMode.ERROR,
          );
        }
      } else {
        reset();
        createNotify(REGISTER_SUCCESS_NOTIFY_MESSAGE);
        router.push("/");
      }
    } catch (error) {
      console.log(error);

      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
    }
  };

  if (isAuth) {
    redirect("/");
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useRegisterForm;

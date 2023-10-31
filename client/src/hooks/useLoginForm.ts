import {
  ERROR_NOTIFY_MESSAGE,
  LOGIN_SUCCESS_NOTIFY_MESSAGE,
} from "@/constants/messages";
import { loginUser } from "@/store/auth/auth.actions";
import { checkIsAuth } from "@/store/auth/auth.slice";
import { AppDispatch } from "@/store/store";
import { ILoginRequest } from "@/types/common";
import { createNotify, notifyMode } from "@/utils/createNotify";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const useLoginForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>();

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit: SubmitHandler<ILoginRequest> = async (values) => {
    try {
      const response = await dispatch(loginUser(values));

      if (loginUser.rejected.match(response)) {
        if (axios.isAxiosError(response.payload)) {
          createNotify(
            response.payload.response?.data?.message,
            notifyMode.ERROR,
          );
        }
      } else {
        reset();
        createNotify(LOGIN_SUCCESS_NOTIFY_MESSAGE);
        router.push("/");
      }
    } catch (error) {
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

export default useLoginForm;

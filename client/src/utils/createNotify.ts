import { toast } from "react-toastify";

export enum notifyMode {
  SUCCESS = "success",
  ERROR = "error",
}

export const createNotify = (
  message: string,
  mode: notifyMode = notifyMode.SUCCESS,
) => {
  switch (mode) {
    case notifyMode.ERROR:
      toast.error(message, { theme: "colored" });
      break;
    default:
      toast.success(message, { theme: "colored" });
      break;
  }
};

"use client";

import { checkAuth } from "@/store/auth/auth.actions";
import { AppDispatch, RootState } from "@/store/store";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { redirect, usePathname } from "next/navigation";
import { LOCALSTORAGE_ACCESS_TOKEN_KEY } from "@/constants/localStorage";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY)) {
      dispatch(checkAuth()).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (
        pathname.startsWith("/profile") ||
        pathname.startsWith("/cart") ||
        pathname.startsWith("/wishlist")
      ) {
        if (!user) {
          redirect("/auth/login");
        }
      }

      if (pathname.startsWith("/admin")) {
        if (user) {
          if (user.role === "USER") {
            redirect("/not-found");
          }
        } else {
          redirect("/not-found");
        }
      }
    }
  }, [isLoading, pathname, user]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthProvider;

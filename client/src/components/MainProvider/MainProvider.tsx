"use client";

import { FC, useEffect } from "react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppDispatch, store } from "@/store/store";

interface MainProviderProps {
  children: React.ReactNode;
}

const MainProvider: FC<MainProviderProps> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        {children}
        <ToastContainer
          autoClose={3000}
          position="bottom-right"
          pauseOnHover={false}
        />
      </Provider>
    </>
  );
};

export default MainProvider;

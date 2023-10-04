import { FC } from "react";
import CustomLink from "../CustomLink/CustomLink";
import styles from "./GoHomeButton.module.scss";

const GoHomeButton: FC = () => {
  return (
    <CustomLink href="/" isButton={true} className={styles["go-back-button"]}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.18833 11.1883C6.60239 11.7742 6.60239 12.7258 7.18833 13.3117L14.6883 20.8117C15.2743 21.3977 16.2258 21.3977 16.8118 20.8117C17.3977 20.2258 17.3977 19.2742 16.8118 18.6883L10.3711 12.2477L16.8071 5.80703C17.393 5.22109 17.393 4.26953 16.8071 3.68359C16.2211 3.09766 15.2696 3.09766 14.6836 3.68359L7.18364 11.1836L7.18833 11.1883Z"
          fill="black"
        />
      </svg>
    </CustomLink>
  );
};

export default GoHomeButton;

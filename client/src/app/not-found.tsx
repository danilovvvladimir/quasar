import { FC } from "react";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { Metadata } from "next";
import styles from "./NotFoundPage.module.scss";
import CustomLink from "@/components/CustomLink/CustomLink";
import {
  NOTFOUNDPAGE_METADATA_DESCRIPTION,
  NOTFOUNDPAGE_METADATA_TITLE,
} from "@/constants/metadata";

export const metadata: Metadata = {
  title: NOTFOUNDPAGE_METADATA_TITLE,
  description: NOTFOUNDPAGE_METADATA_DESCRIPTION,
};

const NotFoundPage: FC = () => {
  return (
    <section className={styles["not-found"]}>
      <div className={styles["not-found__wrapper"]}>
        <Image
          src={"/not-found.svg"}
          alt={"Ошибка #404"}
          width={400}
          height={400}
        />
        <CustomLink href="/" isButton className={styles["not-found__button"]}>
          На главную
        </CustomLink>
      </div>
    </section>
  );
};

export default NotFoundPage;

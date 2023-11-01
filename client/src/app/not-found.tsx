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
import {
  NOTFOUNDPAGE_IMAGE_HEIGHT,
  NOTFOUNDPAGE_IMAGE_WIDTH,
} from "@/constants/sizes";
import { GO_BACK_BUTTON_MESSAGE } from "@/constants/messages";
import { NOTFOUNDPAGE_IMAGE_ALT } from "@/constants/alt";
import { NOTFOUNDPAGE_IMAGE_PATH } from "@/constants/path";

export const metadata: Metadata = {
  title: NOTFOUNDPAGE_METADATA_TITLE,
  description: NOTFOUNDPAGE_METADATA_DESCRIPTION,
};

const NotFoundPage: FC = () => {
  return (
    <section className={styles["not-found"]}>
      <div className={styles["not-found__wrapper"]}>
        <Image
          src={NOTFOUNDPAGE_IMAGE_PATH}
          alt={NOTFOUNDPAGE_IMAGE_ALT}
          width={NOTFOUNDPAGE_IMAGE_WIDTH}
          height={NOTFOUNDPAGE_IMAGE_HEIGHT}
        />
        <CustomLink href="/" isButton className={styles["not-found__button"]}>
          На главную
        </CustomLink>
      </div>
    </section>
  );
};

export default NotFoundPage;

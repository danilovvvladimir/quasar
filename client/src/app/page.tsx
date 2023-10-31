import { FC } from "react";
import styles from "./HomePage.module.scss";
import HomePageInner from "@/components/HomePageInner/HomePageInner";
import {
  HOMEPAGE_METADATA_DESCRIPTION,
  HOMEPAGE_METADATA_TITLE,
} from "@/constants/metadata";

export const metadata = {
  title: HOMEPAGE_METADATA_TITLE,
  description: HOMEPAGE_METADATA_DESCRIPTION,
};

const HomePage: FC = () => {
  return (
    <section className={styles["home-page"]}>
      <HomePageInner />
    </section>
  );
};

export default HomePage;

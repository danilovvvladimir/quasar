import { FC } from "react";
import styles from "./HomePage.module.scss";
import HomePageInner from "@/components/HomePageInner/HomePageInner";

export const metadata = {
  title: "QUASAR | Главная",
  description: "Quasar Главная",
};

const HomePage: FC = () => {
  return (
    <section className={styles["home-page"]}>
      <HomePageInner />
    </section>
  );
};

export default HomePage;

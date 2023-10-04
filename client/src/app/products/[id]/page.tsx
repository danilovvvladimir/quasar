import { FC } from "react";
import SingleProductPageInner from "./SingleProductPageInner";
import styles from "./SingleProductPage.module.scss";

interface SingleProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: SingleProductPageProps) {
  return {
    title: `QUASAR | ${params.id}`,
  };
}

const SingleProductPage: FC<SingleProductPageProps> = async ({
  params: { id },
}) => {
  return (
    <section className={styles["single-product"]}>
      <SingleProductPageInner id={id} />
    </section>
  );
};

export default SingleProductPage;

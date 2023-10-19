import { FC } from "react";
import SingleProductPageInner from "./SingleProductPageInner";
import styles from "./SingleProductPage.module.scss";
import ProductService from "@/services/product";
import NotFoundPage from "@/app/not-found";

interface SingleProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: SingleProductPageProps) {
  const productService = new ProductService();
  const product = await productService.getBySlug(params.slug);

  return {
    title: `QUASAR | ${product.name}`,
  };
}

const SingleProductPage: FC<SingleProductPageProps> = async ({
  params: { slug },
}) => {
  const productService = new ProductService();
  const product = await productService.getBySlug(slug);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <section className={styles["single-product"]}>
      <SingleProductPageInner slug={slug} product={product} />
    </section>
  );
};

export default SingleProductPage;

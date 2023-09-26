import { FC } from "react";
import "./WishlistPage.scss";
import ProductMedium from "@/components/Product/ProductMedium/ProductMedium";

const WishlistPage: FC = () => {
  return (
    <section className="wp">
      <h1 className="title wp__title">Избранное</h1>
      <div className="wp__wrapper">
        {/* map по products в wishlist у current user */}
        <ProductMedium />
        <ProductMedium />
        <ProductMedium />
      </div>
    </section>
  );
};

export default WishlistPage;

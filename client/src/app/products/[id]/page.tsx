import { FC } from "react";
import "./SingleProductPage.scss";
import { Product } from "@/types/product";
import Button from "@/components/UI/Button/Button";
import Image from "next/image";
import SizeList from "@/components/SizeList/SizeList";

interface SingleProductPageProps {
  params: {
    id: string;
  };
}

const SingleProductPage: FC<SingleProductPageProps> = async ({
  params: { id },
}) => {
  const foundProduct: Product = {
    id: id,
    isVisible: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    discountPercentage: 27,
    price: 10900,
    name: "Nike Air Force 1 ‘07",
    slug: "nike-air-force-1-07",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Или .single-product сделать? .single-product__wrapper
  return (
    <section className="single-product">
      <h1 className="title single-product__title">{foundProduct.name}</h1>
      <div className="single-product__wrapper">
        <div className="single-product__about">
          <div className="single-product__about-wrapper">
            <div className="single-product__gallery">
              <div className="single-product__gallery-list">
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={100}
                  height={100}
                />
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={100}
                  height={100}
                />
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={100}
                  height={100}
                />
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={100}
                  height={100}
                />
              </div>
              <div className="single-product__gallery-main">
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <div className="single-product__description">
              <h2 className="title single-product__description-title">
                Описание
              </h2>
              <div className="single-product__description-text">
                {foundProduct.description}
              </div>
            </div>
          </div>

          <div className="single-product__sizes">
            <h2 className="single-product__sizes-title">Размеры</h2>
            <div className="single-product__sizes-list">
              {/* map по размерам */}
              <SizeList
                productDetails={[
                  { id: "1", quantity: 20, size: 41 },
                  { id: "2", quantity: 2, size: 42 },
                  { id: "3", quantity: 30, size: 43 },
                  { id: "4", quantity: 5, size: 44 },
                ]}
              />
            </div>
            {/* <div className="single-product__sizes-info">
              Осталось на складе {0}
            </div> */}
          </div>
        </div>
        <div className="single-product__cart">
          <div className="single-product__cart-total"></div>
          <Button>В корзину</Button>
        </div>
      </div>
      {/* reviews */}
      <div className="single-product__reviews">
        <h2 className="title single-product__title">Отзывы</h2>
        <div className="single-product__reviews-wrapper">
          <div className="single-product__reviews-list">
            {/* singlereview */}
            {/* singlereview */}
            {/* singlereview */}
            {/* ? show more button ? */}
          </div>
          <div className="single-product__reviews-info">
            {/* таблица */}
            <div className="single-product__reviews-disclaimer">
              Отзывы могут оставлять только те, кто купил товар. Так мы
              формируем честный рейтинг
            </div>
            <Button>Написать отзыв</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;

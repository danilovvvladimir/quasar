import { FC } from "react";
import "./SingleProductPage.scss";
import { Product } from "@/types/product";
import Button from "@/components/UI/Button/Button";

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

  // Или .spp сделать? .spp__wrapper
  return (
    <section className="sp-page">
      <h1 className="title sp-page__title">{foundProduct.name}</h1>
      <div className="sp-page__wrapper">
        <div className="sp-page__about">
          <div className="sp-page__gallery">
            <div className="sp-page__gallery-list"></div>
            <div className="sp-page__gallery-main"></div>
          </div>
          <div className="sp-page__description">
            <h2 className="title sp-page__description-title">Описание</h2>
            <div className="sp-page__description-text">
              {foundProduct.description}
            </div>
          </div>
        </div>
        <div className="sp-page__sizes">
          <h2 className="sp-page__sizes-title">Размеры</h2>
          <div className="sp-page__sizes-list">{/* map по размерам */}</div>
          <div className="sp-page__sizes-info">Осталось на складе {0}</div>
        </div>
        <div className="sp-page__cart">
          <div className="sp-page__cart-total"></div>
          <Button>В корзину</Button>
        </div>
      </div>
      {/* reviews */}
      <div className="spp__reviews">
        <h2 className="title spp__title">Отзывы</h2>
        <div className="spp__reviews-wrapper">
          <div className="spp__reviews-list">
            {/* singlereview */}
            {/* singlereview */}
            {/* singlereview */}
            {/* ? show more button ? */}
          </div>
          <div className="spp__reviews-info">
            {/* таблица */}
            <div className="spp__reviews-disclaimer">
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

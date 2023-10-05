import { FC } from "react";
import "./HomePage.scss";
import Navbar from "@/components/Navbar/Navbar";
import Filters from "@/components/Filters/Filters";
import Search from "@/components/Search/Search";
import Select from "@/components/UI/Select/Select";
import ProductsList from "@/components/ProductsList/ProductsList";

export const metadata = {
  title: "QUASAR | Главная",
  description: "Quasar Главная",
};

const HomePage: FC = () => {
  const MIN_PRICE = 500;
  const MAX_PRICE = 5000;
  const CATEGORIES = ["Футболки", "Обувь", "Худи", "Шорты", "Кофты"];
  const options = [
    { value: "by-rating", label: "По рейтингу -" },
    { value: "price-asc", label: "По цене -" },
    { value: "price-desc", label: "По цене +" },
    { value: "date-asc", label: "По новизне -" },
    { value: "date-desc", label: "По новизне +" },
  ];

  return (
    <section className="home-page">
      <div className="home-page__wrapper">
        <Filters
          minPrice={MIN_PRICE}
          maxPrice={MAX_PRICE}
          categories={CATEGORIES}
        />
        <div className="home-page__content">
          <div className="home-page__top-filters">
            <Search />
            <Select options={options} />
          </div>
          <ProductsList />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
